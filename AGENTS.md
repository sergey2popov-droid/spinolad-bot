# AGENTS.md

## Project

**Спинолад / spinolad** is a Telegram-first assistant for natural improvement of daily well-being and useful habits, with the first product focus on neck, shoulders, back, and lower back comfort.

The product should feel warm, practical, calm, and adult: a habit companion that gives short 1-7 day programs, simple movement, tracking, and small recovery rituals, while staying careful about medical red flags.

## Core product idea

The first product surface is a **Telegram bot**. The Mini App comes later as a richer visual/program tracker.

The bot has three main visible entries:

1. **Шея и плечи**
2. **Спина и поясница**
3. **Программа на 1-7 дней**

Each entry must work independently.

For body queries such as "болит шея", "зажаты плечи", "ноет поясница", or "спина после сидения", the bot must answer immediately with a safe first step, red flags, a short program, tracking, and recovery. It may later adapt the plan from daily feedback.

## Important files

- `open_sources_and_db_structure.md`  
  Sources, data model, benefit areas, safety fields, aliases, pantry matching, and MVP product categories.

- `telegram_app_content_ux.md`  
  Telegram UX, main navigation, card structures, scenarios, visual style, and user paths.

- `body_program_concept.md`  
  Current pivot: neck/shoulders/back/lower-back positioning, Telegram-first UX, flexible 1-7 day programs, tracking, adaptation, recovery blocks, and illustration rules.

- `symptom_response_framework.md`  
  Required framework for "Что болит?" answers: red flags, clarification, safe support, products, cautions, sources.

- `instagram_demand_analysis.md`  
  Demand analysis based on user-provided Instagram topics and view counts. Use it to prioritize MVP content.

- `instagram_analysis_template.csv`  
  Template for future Instagram statistics import.

- `visual_mockup.html`  
  Static visual mockup of the Telegram Mini App direction: three main entries, sample stomach answer, product/drink/spoon cards.

- `app_data.js`  
  Inline MVP dataset used by `visual_mockup.html`: symptom guides, product cards, source links, and quick formats.

- `IMPLEMENTATION_PLAN.md`  
  Current checklist plan with completed work and next implementation stages.

- `plan.html`  
  Browser-friendly visual checklist version of the implementation plan.

- `data/sources.json`, `data/symptom_guides.json`, `data/remedies.json`, `data/actions_exercises.json`  
  First structured MVP content base.

- `scripts/check_data.js`  
  Data validation script for required fields, source references, aliases, and banned medical promises.

- `.env.example`  
  Environment variable template without secrets.

- `src/engine.js`, `src/search.js`, `src/format.js`, `src/cli.js`, `src/data.js`  
  Local response engine and CLI for testing Telegram-style answers from JSON data.

- `src/server.js`, `src/suggest.js`, `src/logger.js`  
  Local HTTP prototype: serves `public/`, exposes `/health`, `/api/answer?q=`, `/api/suggest?q=`, and logs queries.

- `src/telegram.js`, `scripts/set_webhook.js`  
  Telegram adapter and webhook setup script. Webhook endpoint is `/telegram/webhook`.

- `package.json`  
  Local commands: `npm run check`, `npm run dev`, `npm run ask -- "query"`.

## Response safety

Do not present the app as a doctor, diagnostic system, or medical treatment replacement.

Forbidden wording:

- "лечит"
- "вылечит"
- "заменяет врача"
- "заменяет лекарства"
- "лечит гастрит/диабет/гормоны"
- "снимает риск на X%"
- "рубает сахар"

Allowed wording:

- "может поддержать"
- "можно попробовать при легком дискомфорте"
- "пищевая поддержка"
- "традиционно используется"
- "данные ограничены"
- "если есть тревожные признаки, лучше обратиться к врачу"
- "может помочь мягко разгрузить"
- "попробуйте в комфортной амплитуде"
- "если боль усиливается, остановитесь"

For movement programs, never promise to fix posture, discs, hernias, nerves, or chronic pain. Keep all exercises gentle, optional, and bounded by symptoms.

## Symptom answer structure

Use this structure for neck/back/body comfort content. Keep the first answer short and practical, not like a long medical questionnaire:

1. **Сначала безопасность**  
   Red flags and when not to rely on self-care.

2. **Что сделать сейчас**  
   One or two gentle actions for mild discomfort.

3. **Программа 1-7 дней**  
   Flexible plan with 1-day, 3-day, and 7-day options.

4. **Трекинг и адаптация**  
   Ask for pain/stiffness 0-10, trigger, what improved/worsened, and adapt next day.

5. **Восстановление**  
   Tiny block inside the program: tea, warm shower, calm music, comedy/lightness, breathing, sleep cue.

6. **Иллюстрация**  
   Clean original scheme: neutral adult, 2 frames + short text, no scary medical imagery.

7. **Что говорит наука**  
   Short evidence note and source references.

## MVP priority

Start with the new body-comfort MVP:

- neck after phone/computer
- tight shoulders and upper back
- back after sitting
- lower back stiffness
- morning stiffness
- evening recovery
- 1-day reset, 3-day reset, and 7-day habit program
- gentle tracking and adaptive next steps

## UX rules

Keep Telegram simple.

Main Telegram entries:

- Шея и плечи
- Спина и поясница
- Программа на 1-7 дней

Mini App is secondary. Do not spend the next implementation step polishing Mini App before the Telegram bot flow is good.

Start message:

- "Помогаю мягко улучшать самочувствие шеи, плеч, спины и поясницы через короткие программы, трекинг и полезные привычки."

Use autocomplete for symptoms and products:

- "ше" -> шея
- "пле" -> плечи
- "сп" -> спина
- "поя" -> поясница
- "си" -> сидячая работа
- "про" -> программа 1-7 дней
- "сон" -> сон

Free text must still work. If intent is unclear, ask one clarifying question.

## Data model themes

Use or extend these planned entities:

- `products`
- `product_nutrients`
- `benefits`
- `product_benefits`
- `cautions`
- `combinations`
- `recipes`
- `actions_exercises`
- `sources`
- `symptom_guides`
- `symptom_aliases`
- `product_aliases`
- `pantry_matches`
- `demand_signals`
- `user_queries`
- `programs`
- `program_days`
- `tracking_checkins`
- `adaptation_rules`
- `illustration_frames`

## Source priorities

Use official and reliable sources first:

- USDA FoodData Central
- WHO
- NIH Office of Dietary Supplements
- NCCIH
- EMA herbal monographs
- PubMed / NCBI
- EU Register of Health Claims / EFSA
- ВИЛАР
- ФИЦ питания и биотехнологии
- Russian botanical, ethnobotanical, and forest-kitchen references listed in `open_sources_and_db_structure.md`

Traditional sources are valuable for culture and usage ideas, but they are not proof of treatment.

## Visual direction

The product should be bright, warm, practical, and trustworthy.

Use:

- own clean illustrations
- neutral adult figure
- 2 frames per movement: start and finish
- short text cue near the scheme
- simple icons for timer, repeat, caution, tracking, source
- clear warning visuals without scary medical imagery

Avoid medicalized spine cutaways, dramatic pain imagery, hyper-flexible fitness poses, and childlike cartoon style.

## Development posture

When implementing:

- prefer small, working MVP steps
- keep Telegram UI minimal
- preserve the three-entry navigation
- make content structured and source-backed
- avoid medical overclaims
- design for people who want a quick useful answer, not a long encyclopedia
