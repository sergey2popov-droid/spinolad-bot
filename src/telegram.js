const { answerQuery } = require("./engine");
const {
  startProgram,
  getUserProgram,
  recordCheckin,
  recordDetailedCheckin,
  programStatus,
  stopProgram,
  startIntake,
  updateIntake,
  clearIntake,
  getUserState
} = require("./checkins");

const mainKeyboard = {
  inline_keyboard: [
    [
      { text: "Шея", callback_data: "intake_area:neck" },
      { text: "Плечи", callback_data: "intake_area:shoulders" }
    ],
    [
      { text: "Спина", callback_data: "intake_area:back" },
      { text: "Поясница", callback_data: "intake_area:lower_back" }
    ]
  ]
};

const programKeyboard = {
  inline_keyboard: [
    [
      { text: "1 день", callback_data: "program:neck_shoulders_1_day" },
      { text: "3 дня", callback_data: "program:neck_shoulders_3_days" }
    ],
    [
      { text: "Спина 3 дня", callback_data: "program:back_lower_3_days" },
      { text: "Спина 7 дней", callback_data: "program:back_lower_7_days" }
    ],
    [{ text: "Назад", callback_data: "mode:home" }]
  ]
};

const checkinKeyboard = {
  inline_keyboard: [
    [
      { text: "Стало легче", callback_data: "checkin:better" },
      { text: "Без изменений", callback_data: "checkin:same" }
    ],
    [{ text: "Стало хуже", callback_data: "checkin:worse" }],
    [{ text: "Новая программа", callback_data: "mode:program" }]
  ]
};

const activeProgramKeyboard = {
  inline_keyboard: [
    [
      { text: "Стало легче", callback_data: "checkin:better" },
      { text: "Без изменений", callback_data: "checkin:same" }
    ],
    [{ text: "Стало хуже", callback_data: "checkin:worse" }],
    [
      { text: "Мой день", callback_data: "program_status" },
      { text: "Завершить", callback_data: "program_stop" }
    ],
    [{ text: "Новая программа", callback_data: "mode:program" }]
  ]
};

const durationKeyboard = {
  inline_keyboard: [
    [
      { text: "Сегодня / пару дней", callback_data: "intake_duration:new" },
      { text: "Повторяется", callback_data: "intake_duration:recurrent" }
    ],
    [{ text: "После сидения / экрана", callback_data: "intake_duration:posture" }],
    [{ text: "Назад", callback_data: "mode:home" }]
  ]
};

const painKeyboard = {
  inline_keyboard: [
    [
      { text: "0-3: терпимо", callback_data: "intake_pain:low" },
      { text: "4-5: мешает", callback_data: "intake_pain:mid" }
    ],
    [{ text: "6+: сильно", callback_data: "intake_pain:high" }],
    [{ text: "Начать заново", callback_data: "mode:home" }]
  ]
};

const redFlagKeyboard = {
  inline_keyboard: [
    [{ text: "Нет, просто дискомфорт", callback_data: "intake_red:none" }],
    [
      { text: "Онемение / слабость", callback_data: "intake_red:neuro" },
      { text: "Травма", callback_data: "intake_red:trauma" }
    ],
    [{ text: "Температура / быстро хуже", callback_data: "intake_red:systemic" }],
    [{ text: "Начать заново", callback_data: "mode:home" }]
  ]
};

const followupLabels = {
  better: "Стало легче",
  same: "Пока так же",
  worse: "Стало хуже"
};

const programQueries = {
  neck_shoulders_1_day: "шея 1 день",
  neck_shoulders_3_days: "шея 3 дня",
  neck_shoulders_7_days: "шея 7 дней",
  back_lower_3_days: "спина 3 дня",
  back_lower_7_days: "спина 7 дней"
};

const firstStepByArea = {
  neck: {
    actionId: "neck_small_range",
    query: "повороты шеи",
    title: "Шея: 90 секунд малой амплитуды",
    cue: "Сядьте ровно, плечи не тяните вверх. 5 раз медленно поверните голову вправо-влево, потом 5 мягких кивков. Движение маленькое, без запрокидывания.",
    watch: "Если появится головокружение, онемение, прострел или боль усилится - остановитесь.",
    freeStep: "Сделайте 5 длинных выдохов и на 30 секунд посмотрите вдаль. Это разгружает экранную позу без лишней растяжки.",
    programId: "neck_shoulders_7_days"
  },
  shoulders: {
    actionId: "shoulder_blade_pause",
    query: "зажаты плечи",
    title: "Плечи: лопаточная пауза",
    cue: "8 раз мягко сведите лопатки назад-вниз, будто кладете их в задние карманы. Шея свободная, поясницу не прогибать.",
    watch: "Если отдает в руку, появляется онемение или боль растет - остановитесь.",
    freeStep: "Опустите плечи на выдохе 5 раз подряд. Не давите на себя, задача - поймать ощущение свободы в шее.",
    programId: "neck_shoulders_7_days"
  },
  back: {
    actionId: "wall_microbreak",
    query: "спина после сидения",
    title: "Спина: микропауза у стены",
    cue: "Встаньте у стены на 60 секунд: затылок не тяните, плечи отпустите, сделайте 5 спокойных выдохов. Потом 30 секунд пройдитесь.",
    watch: "Не прижимайтесь силой и не терпите усиление боли.",
    freeStep: "Поставьте таймер: встать на 60 секунд до того, как спина начнет ныть. Это маленькое правило часто важнее большого упражнения.",
    programId: "back_lower_7_days"
  },
  lower_back: {
    actionId: "pelvic_tilt_easy",
    query: "ноет поясница",
    title: "Поясница: мягкий наклон таза",
    cue: "Лягте на спину с согнутыми коленями или встаньте у стены. 6-8 раз мягко подкрутите таз, чуть уменьшая и возвращая поясничный прогиб.",
    watch: "При отдаче в ногу, слабости, онемении в паху или нарушении мочеиспускания/стула - не продолжайте и обратитесь за медицинской помощью.",
    freeStep: "2 минуты спокойной ходьбы по комнате. Если после ходьбы легче, это хороший знак для мягкого сопровождения.",
    programId: "back_lower_7_days"
  }
};

function welcomeText() {
  return [
    "Спинолад",
    "",
    "Давайте сначала разберемся, что именно беспокоит. Я задам пару коротких вопросов и только потом предложу мягкий следующий шаг.",
    "",
    "С чего начнем?"
  ].join("\n");
}

function programPrompt() {
  return [
    "Выберите стартовую программу.",
    "",
    "Если не уверены, начните с 1 дня для шеи/плеч или 3 дней для спины/поясницы.",
    "",
    "Правило: 0-3/10 можно мягко двигаться, 4-5/10 уменьшаем объем, 6+/10 или онемение/слабость — останавливаемся и не полагаемся на самопомощь."
  ].join("\n");
}

function checkinText(kind) {
  if (kind === "checkin:better") {
    return [
      "Отлично, фиксируем: стало легче.",
      "",
      "Следующий шаг: завтра повторите тот же объем и добавьте только одну маленькую микропаузу. Не увеличивайте сразу амплитуду.",
      "",
      "Вечером снова оцените 0-10: боль/скованность, что помогло, что ухудшило."
    ].join("\n");
  }
  if (kind === "checkin:same") {
    return [
      "Фиксируем: без изменений.",
      "",
      "Следующий шаг: оставьте тот же объем, двигайтесь медленнее и точнее отметьте триггер: экран, сидение, сон, стресс, дорога.",
      "",
      "Если 2-3 дня подряд нет сдвига или симптомы частые, лучше обсудить причину со специалистом."
    ].join("\n");
  }
  if (kind === "checkin:worse") {
    return [
      "Фиксируем: стало хуже.",
      "",
      "На завтра: сократить объем вдвое или оставить только спокойную ходьбу/удобную позу. Уберите движение, после которого усилилось.",
      "",
      "Если есть прострел, онемение, слабость, боль в груди, нарушение мочеиспускания/стула или быстрое усиление боли — не ждите и обратитесь за медицинской помощью."
    ].join("\n");
  }
  return "Записал чек-ин.";
}

function helpText() {
  return [
    "Как пользоваться:",
    "",
    "1. Выберите область: шея, плечи, спина или поясница.",
    "2. Ответьте на 2-3 коротких вопроса: как давно, насколько сильно, есть ли тревожные признаки.",
    "3. В конце дня можно ответить, стало легче или хуже по шкале 0-10.",
    "4. Команды: /status — текущий день, /stop — завершить программу.",
    "",
    "Я покажу короткую программу, трекинг, восстановление, осторожность и источники. Это не диагноз и не замена врачу."
  ].join("\n");
}

function sourcesText() {
  return [
    "Источники Спинолада:",
    "",
    "MedlinePlus, NCCIH, WHO, USDA FoodData Central, NIH ODS, Mayo Clinic, EMA/травные монографии, ВИЛАР и русские традиционные источники.",
    "",
    "В каждой карточке источники показываются отдельно."
  ].join("\n");
}

function modePrompt(mode) {
  if (mode === "mode:neck_shoulders") return "Выберите отдельно: шея или плечи.";
  if (mode === "mode:back") return "Выберите отдельно: спина или поясница.";
  if (mode === "mode:program") return programPrompt();
  if (mode === "mode:home") return welcomeText();
  if (mode === "mode:symptom") return "Напишите, что болит или беспокоит. Например: “болит шея”, “спина после сидения”, “ноет поясница”.";
  if (mode === "mode:remedy") return "Напишите продукт, траву, напиток или средство. Например: “лен”, “ромашка”, “шиповник”.";
  if (mode === "mode:action") return "Напишите цель или часть тела. Например: “ноги”, “спина”, “дыхание”, “сахар после еды”.";
  return "Напишите запрос своими словами.";
}

function areaName(area) {
  return {
    neck: "шея",
    shoulders: "плечи",
    back: "спина",
    lower_back: "поясница"
  }[area] || "эта область";
}

function queryForIntake(intake = {}) {
  const area = intake.area;
  if (area === "neck") return intake.duration === "posture" ? "шея после компьютера" : "болит шея";
  if (area === "shoulders") return "зажаты плечи";
  if (area === "back") return "спина после сидения";
  if (area === "lower_back") return "ноет поясница";
  return "болит шея";
}

function feedbackKeyboard(area) {
  return {
    inline_keyboard: [
      [
        { text: "Стало легче", callback_data: `step_feedback:better:${area}` },
        { text: "Пока так же", callback_data: `step_feedback:same:${area}` }
      ],
      [{ text: "Стало хуже", callback_data: `step_feedback:worse:${area}` }]
    ]
  };
}

function continuationKeyboard(area) {
  return {
    inline_keyboard: [
      [{ text: "Вести меня 7 дней", callback_data: `guided_start:${area}` }],
      [{ text: "Еще один бесплатный шаг", callback_data: `free_step:${area}` }],
      [{ text: "Позже", callback_data: "mode:home" }]
    ]
  };
}

function startIntakeMessages(chatId, area) {
  startIntake(chatId, area);
  return [
    messageResponse(
      chatId,
      [
        `Понял: ${areaName(area)}.`,
        "",
        "Вопрос 1 из 3: как давно или после чего началось?"
      ].join("\n"),
      durationKeyboard
    )
  ];
}

function intakeDurationMessages(chatId, duration) {
  updateIntake(chatId, { duration });
  return [
    messageResponse(
      chatId,
      [
        "Спасибо, понял контекст.",
        "",
        "Вопрос 2 из 3: насколько сильно по ощущениям?"
      ].join("\n"),
      painKeyboard
    )
  ];
}

function intakePainMessages(chatId, pain) {
  updateIntake(chatId, { pain });
  return [
    messageResponse(
      chatId,
      [
        "Принял.",
        "",
        "Вопрос 3 из 3: есть что-то из тревожных признаков?"
      ].join("\n"),
      redFlagKeyboard
    )
  ];
}

function intakeRedFlagMessages(chatId, redFlag) {
  const savedState = updateIntake(chatId, { redFlag });
  const intake = savedState.intake || { redFlag };

  if (redFlag !== "none" || intake.pain === "high") {
    clearIntake(chatId);
    return [
      messageResponse(
        chatId,
        [
          "Тут лучше не начинать программу вслепую.",
          "",
          redFlag !== "none"
            ? "Если есть онемение, слабость, травма, температура или быстрое ухудшение, безопаснее обратиться за медицинской оценкой."
            : "При сильной боли 6+/10 лучше сначала снизить нагрузку и не делать упражнения через боль.",
          "",
          "Пока можно выбрать только мягкое восстановление: удобная поза, спокойная ходьба без усиления симптомов, теплый душ только если от тепла легче и нет травмы/температуры."
        ].join("\n"),
        mainKeyboard
      )
    ];
  }

  clearIntake(chatId);
  return firstStepMessages(chatId, intake);
}

function labelDuration(duration) {
  if (duration === "new") return "началось недавно";
  if (duration === "recurrent") return "повторяется";
  if (duration === "posture") return "связано с сидением или экраном";
  return "контекст уточнен";
}

function firstStepMessages(chatId, intake = {}) {
  const area = intake.area || "neck";
  const step = firstStepByArea[area] || firstStepByArea.neck;
  const answer = answerQuery(step.query);
  const imageUrl = publicAssetUrl(answer.illustration?.assetPath);
  const text = [
    `Похоже на мягкое напряжение: ${areaName(area)}, ${labelDuration(intake.duration)}, до 5/10, без тревожных признаков.`,
    "",
    "Давайте не грузить вас программой сразу. Сначала проверим одну вещь на 90 секунд.",
    "",
    step.title,
    step.cue,
    "",
    step.watch,
    "",
    "После этого нажмите, что изменилось."
  ].join("\n");
  const messages = [];
  if (imageUrl) {
    messages.push(photoResponse(chatId, imageUrl, `${answer.illustration.title}\n${answer.illustration.textCue}`));
  }
  messages.push(messageResponse(chatId, text, feedbackKeyboard(area)));
  return messages;
}

function stepFeedbackMessages(chatId, kind, area) {
  const label = followupLabels[kind] || "Принял";
  const lead = {
    better: "Отлично. Значит телу подходит мягкое движение, без рывка и героизма.",
    same: "Нормально. Первый шаг не всегда сразу дает вау-эффект; важнее понять, что не стало хуже.",
    worse: "Спасибо, это важный сигнал. Сегодня не усиливаем движение и убираем то, после чего стало неприятнее."
  }[kind] || "Принял.";
  return [
    messageResponse(
      chatId,
      [
        `${label}.`,
        "",
        lead,
        "",
        "Я могу вести вас 7 дней: каждый день 2 минуты, короткий чек-ин и адаптация по ощущениям. Так человек не остается один на один с задачей \"надо бы заняться собой\".",
        "",
        "Что делаем дальше?"
      ].join("\n"),
      continuationKeyboard(area)
    )
  ];
}

function freeStepMessages(chatId, area) {
  const step = firstStepByArea[area] || firstStepByArea.neck;
  return [
    messageResponse(
      chatId,
      [
        "Еще один бесплатный шаг.",
        "",
        step.freeStep,
        "",
        "Потом лучше не добавлять третье упражнение подряд. Для привычки важнее коротко повторить завтра и отметить реакцию."
      ].join("\n"),
      continuationKeyboard(area)
    )
  ];
}

function guidedStartMessages(chatId, area) {
  const step = firstStepByArea[area] || firstStepByArea.neck;
  startProgram(chatId, step.programId);
  return [
    messageResponse(
      chatId,
      [
        "Хорошо, включаю сопровождение.",
        "",
        "День 1: повторите сегодняшний мягкий шаг один раз и вечером нажмите чек-ин. Если стало хуже - программа сразу уменьшит нагрузку.",
        "",
        "Восстановление сегодня: теплый душ 3-5 минут или спокойная музыка 10 минут. Без обещаний чудес, просто маленькая опора для тела и головы."
      ].join("\n"),
      activeProgramKeyboard
    )
  ];
}

function chunkText(text, maxLength = 3900) {
  if (text.length <= maxLength) return [text];
  const chunks = [];
  let rest = text;
  while (rest.length > maxLength) {
    let cut = rest.lastIndexOf("\n\n", maxLength);
    if (cut < 800) cut = rest.lastIndexOf("\n", maxLength);
    if (cut < 800) cut = maxLength;
    chunks.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

function messageResponse(chatId, text, replyMarkup) {
  return {
    method: "sendMessage",
    payload: {
      chat_id: chatId,
      text,
      reply_markup: replyMarkup,
      disable_web_page_preview: true
    }
  };
}

function photoResponse(chatId, photo, caption) {
  return {
    method: "sendPhoto",
    payload: {
      chat_id: chatId,
      photo,
      caption
    }
  };
}

function publicAssetUrl(assetPath) {
  const baseUrl = (process.env.APP_BASE_URL || "").replace(/\/+$/, "");
  if (!baseUrl || !assetPath) return null;
  return `${baseUrl}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
}

function answerMessages(chatId, query) {
  const answer = answerQuery(query);
  if (answer.matchType === "program" && answer.matchId) {
    startProgram(chatId, answer.matchId);
  }
  const chunks = chunkText(answer.text);
  const keyboard = answer.matchType === "program" ? activeProgramKeyboard : mainKeyboard;
  const messages = chunks.map((chunk, index) => messageResponse(chatId, chunk, index === chunks.length - 1 ? keyboard : undefined));
  const imageUrl = publicAssetUrl(answer.illustration?.assetPath);
  if (imageUrl) {
    messages.push(photoResponse(chatId, imageUrl, `${answer.illustration.title}\n${answer.illustration.textCue}`));
  }
  return messages;
}

function statusKeyboard(chatId) {
  return getUserProgram(chatId) ? activeProgramKeyboard : mainKeyboard;
}

function handleTelegramUpdate(update) {
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = (update.message.text || "").trim();
    if (!text || text === "/start") return [messageResponse(chatId, welcomeText(), mainKeyboard)];
    if (text === "/help") return [messageResponse(chatId, helpText(), mainKeyboard)];
    if (text === "/sources") return [messageResponse(chatId, sourcesText(), mainKeyboard)];
    if (text === "/status") return [messageResponse(chatId, programStatus(chatId), statusKeyboard(chatId))];
    if (text === "/stop") return [messageResponse(chatId, stopProgram(chatId), mainKeyboard)];
    const detail = recordDetailedCheckin(chatId, text);
    if (detail.matched) {
      return [messageResponse(chatId, detail.text, detail.hasProgram ? activeProgramKeyboard : mainKeyboard)];
    }
    return answerMessages(chatId, text);
  }

  if (update.callback_query) {
    const chatId = update.callback_query.message.chat.id;
    const data = update.callback_query.data;
    if (data.startsWith("intake_area:")) return startIntakeMessages(chatId, data.replace("intake_area:", ""));
    if (data.startsWith("intake_duration:")) return intakeDurationMessages(chatId, data.replace("intake_duration:", ""));
    if (data.startsWith("intake_pain:")) return intakePainMessages(chatId, data.replace("intake_pain:", ""));
    if (data.startsWith("intake_red:")) return intakeRedFlagMessages(chatId, data.replace("intake_red:", ""));
    if (data.startsWith("step_feedback:")) {
      const [, kind, area] = data.split(":");
      return stepFeedbackMessages(chatId, kind, area);
    }
    if (data.startsWith("free_step:")) return freeStepMessages(chatId, data.replace("free_step:", ""));
    if (data.startsWith("guided_start:")) return guidedStartMessages(chatId, data.replace("guided_start:", ""));
    if (data.startsWith("program:")) {
      const id = data.replace("program:", "");
      const query = programQueries[id] || id.replaceAll("_", " ");
      return answerMessages(chatId, query);
    }
    if (data.startsWith("checkin:")) {
      const kind = data.replace("checkin:", "");
      const result = recordCheckin(chatId, kind);
      return [messageResponse(chatId, result.text || checkinText(data), result.hasProgram ? activeProgramKeyboard : mainKeyboard)];
    }
    if (data === "program_status") return [messageResponse(chatId, programStatus(chatId), statusKeyboard(chatId))];
    if (data === "program_stop") return [messageResponse(chatId, stopProgram(chatId), mainKeyboard)];
    return [messageResponse(chatId, modePrompt(data), data === "mode:program" ? programKeyboard : mainKeyboard)];
  }

  return [];
}

async function sendTelegramMethod(token, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Telegram ${method} failed: ${response.status}`);
  return response.json();
}

module.exports = {
  handleTelegramUpdate,
  sendTelegramMethod,
  welcomeText,
  helpText,
  sourcesText,
  mainKeyboard,
  programKeyboard,
  checkinKeyboard,
  activeProgramKeyboard
};
