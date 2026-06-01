function take(items, count) {
  return (items || []).slice(0, count);
}

function bullets(items) {
  return take(items, 5).map((item) => `- ${item}`).join("\n");
}

function sourceList(ids, sources) {
  const byId = new Map(sources.map((source) => [source.id, source]));
  return (ids || [])
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((source) => `- ${source.organization}: ${source.title} (${source.url})`)
    .join("\n");
}

const bodyProgramIds = new Set([
  "neck_phone_computer",
  "shoulders_upper_back",
  "back_after_sitting",
  "lower_back_stiffness"
]);

function formatSymptom(guide, sources) {
  const isBodyProgram = bodyProgramIds.has(guide.id);
  const recipes = take(guide.folk_recipes, 3)
    .map((recipe, index) => `${index + 1}. ${recipe.name}\n   ${recipe.recipe}\n   Как применять: ${recipe.how_to_use}\n   Осторожно: ${recipe.caution}`)
    .join("\n\n");

  return [
    `Спинолад: ${guide.title}`,
    "",
    guide.plain_explanation,
    "",
    isBodyProgram ? "Мягкий план:" : "Народные рецепты:",
    recipes,
    "",
    isBodyProgram ? "Восстановление:" : "Продукты и напитки:",
    bullets(guide.foods_drinks),
    "",
    "Упражнения и действия:",
    bullets(guide.actions),
    "",
    isBodyProgram ? "Трекинг и адаптация:" : "Работа с симптомами:",
    guide.symptom_work,
    "",
    "Когда не тянуть:",
    bullets(guide.red_flags),
    "",
    "Осторожно:",
    bullets(guide.cautions),
    "",
    "Источники:",
    sourceList(guide.sources, sources)
  ].join("\n");
}

function formatRemedy(remedy, sources) {
  return [
    `Целебное средство: ${remedy.title}`,
    "",
    `Для чего: ${(remedy.supports || []).join(", ")}`,
    "",
    "Рецепт / форма:",
    remedy.recipe,
    "",
    "Как применять:",
    remedy.use,
    "",
    "Осторожно:",
    remedy.caution,
    "",
    "Источники:",
    sourceList(remedy.sources, sources)
  ].join("\n");
}

function formatIllustration(illustration) {
  if (!illustration) return "";
  return [
    "Иллюстрация:",
    `Файл: ${illustration.asset_path}`,
    `Стиль: ${illustration.style}`,
    `Кадр 1 — ${illustration.frame_1.caption}: ${illustration.frame_1.description}`,
    `Кадр 2 — ${illustration.frame_2.caption}: ${illustration.frame_2.description}`,
    `Подпись: ${illustration.text_cue}`,
    `Не изображать: ${(illustration.avoid || []).join(", ")}`
  ].join("\n");
}

function formatAction(action, sources, illustrations = []) {
  const illustration = illustrations.find((item) => item.action_id === action.id);
  return [
    `Упражнение / действие: ${action.title}`,
    "",
    `Для чего: ${(action.supports || []).join(", ")}`,
    "",
    "Как делать:",
    action.protocol,
    "",
    "Почему может работать:",
    action.mechanism,
    "",
    "Что отслеживать:",
    action.track,
    "",
    "Осторожно:",
    action.caution,
    "",
    formatIllustration(illustration),
    illustration ? "" : null,
    "Источники:",
    sourceList(action.sources, sources)
  ].filter((item) => item !== null && item !== "").join("\n");
}

function formatProgram(program, sources) {
  const days = (program.days || [])
    .map((day) => [
      `День ${day.day}: ${day.focus}`,
      `- ${day.steps.join("\n- ")}`,
      `Восстановление: ${day.recovery}`,
      `Трекинг: ${day.tracking}`
    ].join("\n"))
    .join("\n\n");

  return [
    `Программа: ${program.title}`,
    "",
    program.intro,
    "",
    "Сначала безопасность:",
    bullets(program.red_flags),
    "",
    "План:",
    days,
    "",
    "Адаптация:",
    bullets(program.adaptation),
    "",
    "Вечерний чек-ин:",
    "Ответьте кнопкой: стало легче / без изменений / стало хуже. По этому ответу я подскажу, как мягко изменить следующий день.",
    "",
    "Источники:",
    sourceList(program.sources, sources)
  ].join("\n");
}

function formatResult(result, data) {
  if (!result) {
    return [
      "Не нашел точное совпадение.",
      "Попробуйте: болит шея, зажаты плечи, спина после сидения, ноет поясница, программа на 3 дня."
    ].join("\n");
  }
  if (result.type === "program") return formatProgram(result.item, data.sources);
  if (result.type === "symptom") return formatSymptom(result.item, data.sources);
  if (result.type === "remedy") return formatRemedy(result.item, data.sources);
  if (result.type === "action") return formatAction(result.item, data.sources, data.illustrations);
  return "Неизвестный тип результата.";
}

module.exports = { formatResult };
