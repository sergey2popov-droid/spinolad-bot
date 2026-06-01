const fs = require("fs");
const path = require("path");
const { loadData } = require("./data");

const root = path.resolve(__dirname, "..");
const logDir = path.join(root, "logs");
const stateFile = path.join(logDir, "user_state.json");
const checkinsFile = path.join(logDir, "checkins.jsonl");

function ensureLogDir() {
  fs.mkdirSync(logDir, { recursive: true });
}

function readState() {
  ensureLogDir();
  if (!fs.existsSync(stateFile)) return {};
  try {
    return JSON.parse(fs.readFileSync(stateFile, "utf8"));
  } catch (error) {
    return {};
  }
}

function writeState(state) {
  ensureLogDir();
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8");
}

function findProgram(programId) {
  const data = loadData();
  return (data.programs || []).find((program) => program.id === programId) || null;
}

function startProgram(chatId, programId) {
  const program = findProgram(programId);
  if (!program) return null;

  const state = readState();
  state[String(chatId)] = {
    activeProgramId: programId,
    currentDay: 1,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastCheckin: null,
    awaitingDetails: false
  };
  writeState(state);
  return state[String(chatId)];
}

function getUserProgram(chatId) {
  const state = readState();
  const userState = state[String(chatId)] || null;
  if (!userState?.activeProgramId) return null;
  const program = findProgram(userState.activeProgramId);
  if (!program) return null;
  return { state: userState, program };
}

function getUserState(chatId) {
  const state = readState();
  return state[String(chatId)] || null;
}

function saveUserState(chatId, userState) {
  const state = readState();
  state[String(chatId)] = {
    ...(state[String(chatId)] || {}),
    ...userState,
    updatedAt: new Date().toISOString()
  };
  writeState(state);
  return state[String(chatId)];
}

function startIntake(chatId, area) {
  return saveUserState(chatId, {
    intake: {
      area,
      startedAt: new Date().toISOString()
    }
  });
}

function updateIntake(chatId, patch) {
  const current = getUserState(chatId) || {};
  const intake = {
    ...(current.intake || {}),
    ...patch,
    updatedAt: new Date().toISOString()
  };
  return saveUserState(chatId, { intake });
}

function clearIntake(chatId) {
  const state = readState();
  const userState = state[String(chatId)] || {};
  delete userState.intake;
  if (Object.keys(userState).length) state[String(chatId)] = userState;
  else delete state[String(chatId)];
  writeState(state);
}

function stopProgram(chatId) {
  const active = getUserProgram(chatId);
  const state = readState();
  delete state[String(chatId)];
  writeState(state);

  if (!active) {
    return [
      "Активной программы сейчас нет.",
      "",
      "Начните с выбора области: шея, плечи, спина или поясница."
    ].join("\n");
  }

  appendCheckin({
    chatId,
    programId: active.program.id,
    day: active.state.currentDay,
    kind: "stopped"
  });

  return [
    `Завершил программу: ${active.program.title}.`,
    "",
    "Сохранил это в локальной истории. Можно начать новую программу, когда будет удобно."
  ].join("\n");
}

function programStatus(chatId) {
  const active = getUserProgram(chatId);
  if (!active) {
    return [
      "Активной программы сейчас нет.",
      "",
      "Начните с выбора области: шея, плечи, спина или поясница."
    ].join("\n");
  }

  const { state: userState, program } = active;
  const day = Number(userState.currentDay || 1);
  const durationDays = Number(program.duration_days || (program.days || []).length || 1);
  const last = userState.lastCheckin;
  const detail = userState.lastDetail;

  const lines = [
    `Активная программа: ${program.title}`,
    `День: ${day} из ${durationDays}`,
    "",
    daySummary(program, day)
  ];

  if (last) {
    lines.push("", `Последний чек-ин: ${labelKind(last.kind)}, день ${last.day} -> ${last.nextDay}.`);
  }

  if (detail) {
    lines.push("", "Последняя подробность:");
    if (detail.pain !== null && detail.pain !== undefined) lines.push(`- боль: ${detail.pain}/10`);
    if (detail.stiffness !== null && detail.stiffness !== undefined) lines.push(`- скованность: ${detail.stiffness}/10`);
    if (detail.helped) lines.push(`- помогло: ${detail.helped}`);
    if (detail.worsened) lines.push(`- ухудшило: ${detail.worsened}`);
  }

  lines.push("", "Вечером можно нажать чек-ин или написать: боль 3 скованность 5 помог душ ухудшил ноутбук.");
  return lines.join("\n");
}

function labelKind(kind) {
  if (kind === "better") return "стало легче";
  if (kind === "same") return "без изменений";
  if (kind === "worse") return "стало хуже";
  return kind || "чек-ин";
}

function appendCheckin(entry) {
  ensureLogDir();
  fs.appendFileSync(checkinsFile, JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n", "utf8");
}

function nextDayFor(kind, currentDay, durationDays) {
  if (kind === "better") return Math.min(currentDay + 1, durationDays);
  if (kind === "same") return currentDay;
  if (kind === "worse") return currentDay;
  return currentDay;
}

function daySummary(program, dayNumber) {
  const day = (program.days || []).find((item) => item.day === dayNumber);
  if (!day) return "Продолжайте самый мягкий вариант программы и отмечайте реакцию 0-10.";
  return [
    `День ${day.day}: ${day.focus}`,
    `- ${day.steps.join("\n- ")}`,
    `Восстановление: ${day.recovery}`,
    `Трекинг: ${day.tracking}`
  ].join("\n");
}

function recordCheckin(chatId, kind) {
  const active = getUserProgram(chatId);
  if (!active) {
    return {
      hasProgram: false,
      text: [
        "Пока нет активной программы.",
        "",
        "Сначала выберите область: шея, плечи, спина или поясница."
      ].join("\n")
    };
  }

  const { state: userState, program } = active;
  const currentDay = Number(userState.currentDay || 1);
  const durationDays = Number(program.duration_days || (program.days || []).length || 1);
  const nextDay = nextDayFor(kind, currentDay, durationDays);

  const state = readState();
  state[String(chatId)] = {
    ...userState,
    currentDay: nextDay,
    updatedAt: new Date().toISOString(),
    lastCheckin: { kind, day: currentDay, nextDay, ts: new Date().toISOString() },
    awaitingDetails: true
  };
  writeState(state);

  appendCheckin({
    chatId,
    programId: program.id,
    day: currentDay,
    nextDay,
    kind
  });

  return {
    hasProgram: true,
    program,
    currentDay,
    nextDay,
    text: checkinResponse(kind, program, currentDay, nextDay)
  };
}

function parseNumberAfter(text, words) {
  for (const word of words) {
    const match = text.match(new RegExp(`${word}\\D{0,12}(10|[0-9])`, "i"));
    if (match) return Number(match[1]);
  }
  return null;
}

function extractPhrase(text, words) {
  for (const word of words) {
    const stopWords = "помогло|помог|помогла|легче от|ухудшило|ухудшил|ухудшила|хуже от|усилило|усилил|усилила|боль|болит|дискомфорт|скованность|зажим|напряжение";
    const match = text.match(new RegExp(`${word}\\s+(.+?)(?=\\s+(?:${stopWords})(?:\\s|$)|[.;\\n]|$)`, "i"));
    if (match) return match[1].trim().slice(0, 120);
  }
  return null;
}

function parseDetailText(text) {
  const clean = String(text || "").trim();
  if (!clean) return null;

  const lower = clean.toLowerCase().replaceAll("ё", "е");
  const pain = parseNumberAfter(lower, ["боль", "болит", "дискомфорт"]);
  const stiffness = parseNumberAfter(lower, ["скованность", "зажим", "напряжение"]);
  const helped = extractPhrase(clean, ["помогло", "помог", "легче от"]);
  const worsened = extractPhrase(clean, ["ухудшило", "ухудшил", "ухудшила", "хуже от", "усилило", "усилил", "усилила"]);
  const redFlagWords = ["онемение", "слабость", "прострел", "температура", "груд", "мочеиспуск", "стул"];
  const hasRedFlagWord = redFlagWords.some((word) => lower.includes(word));

  if (pain === null && stiffness === null && !helped && !worsened && !hasRedFlagWord) return null;

  return {
    pain,
    stiffness,
    helped,
    worsened,
    hasRedFlagWord,
    raw: clean
  };
}

function recordDetailedCheckin(chatId, text) {
  const details = parseDetailText(text);
  if (!details) return { matched: false };

  const active = getUserProgram(chatId);
  if (!active) {
    return {
      matched: true,
      hasProgram: false,
      text: [
        "Понял чек-ин, но активной программы пока нет.",
        "",
        "Выберите программу, и дальше я буду привязывать такие записи к конкретному дню."
      ].join("\n")
    };
  }

  const { state: userState, program } = active;
  const day = Number(userState.currentDay || 1);
  const state = readState();
  state[String(chatId)] = {
    ...userState,
    updatedAt: new Date().toISOString(),
    awaitingDetails: false,
    lastDetail: { ...details, day, ts: new Date().toISOString() }
  };
  writeState(state);

  appendCheckin({
    chatId,
    programId: program.id,
    day,
    kind: "details",
    details
  });

  return {
    matched: true,
    hasProgram: true,
    text: detailedResponse(program, day, details)
  };
}

function detailLine(label, value) {
  if (value === null || value === undefined || value === "") return null;
  return `${label}: ${value}`;
}

function detailedResponse(program, day, details) {
  const lines = [
    `Записал подробный чек-ин. Программа: ${program.title}, день ${day}.`,
    "",
    detailLine("Боль", details.pain === null ? null : `${details.pain}/10`),
    detailLine("Скованность", details.stiffness === null ? null : `${details.stiffness}/10`),
    detailLine("Помогло", details.helped),
    detailLine("Ухудшило", details.worsened)
  ].filter(Boolean);

  const highPain = (details.pain !== null && details.pain >= 6) || (details.stiffness !== null && details.stiffness >= 7);
  if (details.hasRedFlagWord || highPain) {
    lines.push(
      "",
      "На завтра лучше снизить объем: только удобная поза, спокойная ходьба или восстановление. Не делайте движение, которое усиливает симптомы.",
      "",
      "Если есть онемение, слабость, прострел, боль в груди, температура, нарушение мочеиспускания/стула или быстрое ухудшение — не ждите и обратитесь за медицинской помощью."
    );
    return lines.join("\n");
  }

  if (details.pain !== null && details.pain <= 3) {
    lines.push(
      "",
      "Можно продолжать мягко: оставьте тот же объем и добавьте только одну маленькую паузу, если день спокойный."
    );
    return lines.join("\n");
  }

  lines.push(
    "",
    "На следующий день оставьте тот же объем. Главная задача — повторить то, что помогло, и убрать то, что ухудшило."
  );
  return lines.join("\n");
}

function checkinResponse(kind, program, currentDay, nextDay) {
  if (kind === "better") {
    return [
      `Записал: стало легче. Программа: ${program.title}.`,
      "",
      nextDay > currentDay
        ? `Переходим к дню ${nextDay}, но без резкого увеличения нагрузки.`
        : "Вы уже на последнем дне программы: закрепляем самый мягкий работающий вариант.",
      "",
      daySummary(program, nextDay),
      "",
      "Вечером напишите подробность одной строкой: боль 0-10, скованность 0-10, что помогло, что ухудшило."
    ].join("\n");
  }

  if (kind === "same") {
    return [
      `Записал: без изменений. Программа: ${program.title}.`,
      "",
      `Остаемся на дне ${currentDay}. Сегодня цель — не добавить, а сделать медленнее и заметить триггер.`,
      "",
      daySummary(program, currentDay),
      "",
      "Напишите подробность одной строкой: боль 0-10, скованность 0-10, что помогло, что ухудшило. Если 2-3 дня подряд нет сдвига или симптомы частые, лучше обсудить причину со специалистом."
    ].join("\n");
  }

  if (kind === "worse") {
    return [
      `Записал: стало хуже. Программа: ${program.title}.`,
      "",
      "На следующий день уменьшаем объем: уберите движение, после которого усилилось, оставьте только спокойную ходьбу, удобную позу или восстановление.",
      "",
      "Если есть прострел, онемение, слабость, боль в груди, нарушение мочеиспускания/стула или быстрое усиление боли — не ждите и обратитесь за медицинской помощью."
    ].join("\n");
  }

  return "Записал чек-ин.";
}

module.exports = {
  startProgram,
  getUserProgram,
  stopProgram,
  programStatus,
  startIntake,
  updateIntake,
  clearIntake,
  getUserState,
  recordCheckin,
  recordDetailedCheckin,
  parseDetailText
};
