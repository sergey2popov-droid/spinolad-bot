const { answerQuery } = require("./engine");
const { startProgram, getUserProgram, recordCheckin, recordDetailedCheckin, programStatus, stopProgram } = require("./checkins");

const mainKeyboard = {
  inline_keyboard: [
    [{ text: "Шея и плечи", callback_data: "mode:neck_shoulders" }],
    [
      { text: "Спина и поясница", callback_data: "mode:back" },
      { text: "Программа 1-7 дней", callback_data: "mode:program" }
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

const programQueries = {
  neck_shoulders_1_day: "шея 1 день",
  neck_shoulders_3_days: "шея 3 дня",
  back_lower_3_days: "спина 3 дня",
  back_lower_7_days: "спина 7 дней"
};

function welcomeText() {
  return [
    "Целебник",
    "Здоровье и энергия доступные всем",
    "",
    "Помогаю мягко улучшать самочувствие шеи, плеч, спины и поясницы через короткие программы, трекинг и полезные привычки.",
    "",
    "Напишите запрос своими словами: “болит шея”, “зажаты плечи”, “спина после сидения”, “ноет поясница”."
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
    "1. Напишите, что беспокоит: “шея”, “плечи”, “спина”, “поясница”.",
    "2. Уточните контекст: “после компьютера”, “после сидения”, “утром”, “вечером”.",
    "3. В конце дня можно ответить, стало легче или хуже по шкале 0-10.",
    "4. Команды: /status — текущий день, /stop — завершить программу.",
    "",
    "Я покажу короткую программу, трекинг, восстановление, осторожность и источники. Это не диагноз и не замена врачу."
  ].join("\n");
}

function sourcesText() {
  return [
    "Источники Целебника:",
    "",
    "MedlinePlus, NCCIH, WHO, USDA FoodData Central, NIH ODS, Mayo Clinic, EMA/травные монографии, ВИЛАР и русские традиционные источники.",
    "",
    "В каждой карточке источники показываются отдельно."
  ].join("\n");
}

function modePrompt(mode) {
  if (mode === "mode:neck_shoulders") return "Напишите, что с шеей или плечами. Например: “болит шея”, “зажаты плечи”, “между лопатками”.";
  if (mode === "mode:back") return "Напишите, что со спиной или поясницей. Например: “спина после сидения”, “ноет поясница”, “утренняя скованность”.";
  if (mode === "mode:program") return programPrompt();
  if (mode === "mode:home") return welcomeText();
  if (mode === "mode:symptom") return "Напишите, что болит или беспокоит. Например: “болит шея”, “спина после сидения”, “ноет поясница”.";
  if (mode === "mode:remedy") return "Напишите продукт, траву, напиток или средство. Например: “лен”, “ромашка”, “шиповник”.";
  if (mode === "mode:action") return "Напишите цель или часть тела. Например: “ноги”, “спина”, “дыхание”, “сахар после еды”.";
  return "Напишите запрос своими словами.";
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
  return getUserProgram(chatId) ? activeProgramKeyboard : programKeyboard;
}

function handleTelegramUpdate(update) {
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = (update.message.text || "").trim();
    if (!text || text === "/start") return [messageResponse(chatId, welcomeText(), mainKeyboard)];
    if (text === "/help") return [messageResponse(chatId, helpText(), mainKeyboard)];
    if (text === "/sources") return [messageResponse(chatId, sourcesText(), mainKeyboard)];
    if (text === "/status") return [messageResponse(chatId, programStatus(chatId), statusKeyboard(chatId))];
    if (text === "/stop") return [messageResponse(chatId, stopProgram(chatId), programKeyboard)];
    const detail = recordDetailedCheckin(chatId, text);
    if (detail.matched) {
      return [messageResponse(chatId, detail.text, detail.hasProgram ? activeProgramKeyboard : programKeyboard)];
    }
    return answerMessages(chatId, text);
  }

  if (update.callback_query) {
    const chatId = update.callback_query.message.chat.id;
    const data = update.callback_query.data;
    if (data.startsWith("program:")) {
      const id = data.replace("program:", "");
      const query = programQueries[id] || id.replaceAll("_", " ");
      return answerMessages(chatId, query);
    }
    if (data.startsWith("checkin:")) {
      const kind = data.replace("checkin:", "");
      const result = recordCheckin(chatId, kind);
      return [messageResponse(chatId, result.text || checkinText(data), result.hasProgram ? activeProgramKeyboard : programKeyboard)];
    }
    if (data === "program_status") return [messageResponse(chatId, programStatus(chatId), statusKeyboard(chatId))];
    if (data === "program_stop") return [messageResponse(chatId, stopProgram(chatId), programKeyboard)];
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
