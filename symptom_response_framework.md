# Symptom response framework for Spinolad

## Core decision

The app has three separate entries:

1. **Что болит?**
2. **Что съесть?**
3. **Что есть дома?**

They can connect to each other, but each must work independently.

If a user writes "болит желудок", the app must not ask them to switch rubrics first. It should immediately provide a structured support answer, then offer the optional button "Подобрать из того, что есть дома".

## What world practice suggests

Health symptom checkers and trusted health sites usually follow this logic:

1. **Triage first**: identify warning signs and when urgent care is needed.
2. **Clarify the symptom**: location, duration, severity, associated symptoms.
3. **Self-care only for mild/non-urgent cases**.
4. **No definitive diagnosis without clinician review**.
5. **Escalate clearly** when symptoms are severe, persistent, recurrent, or linked with risk factors.

Spinolad should adapt this to food/traditional support:

- no diagnosis
- no "cure" promise
- no replacement for medical care
- practical food/drink/herb suggestions only after red flags
- optional pantry matching

## Universal answer template

For every "Что болит?" answer:

### 1. Short recognition

"Похоже, речь про дискомфорт в [area]. Сначала проверим, нет ли признаков, где лучше не заниматься самопомощью."

### 2. Simple time split

Keep the first answer human and short:

- "Если началось недавно..."
- "Если длится несколько дней или часто повторяется..."

Example:

"Если желудок заболел недавно и боль терпимая, можно попробовать мягкую еду, теплую воду и убрать раздражители. Если это длится несколько дней, часто повторяется или усиливается, лучше выяснить причину с врачом, а питание использовать как поддержку."

### 3. What can help now

This is the most important user need.

Include:

- what to eat now
- what to drink now
- what to avoid today
- one simple action

### 4. Long-term support

Show what may support the area over time:

- concrete traditional recipes
- proportions
- how often people traditionally use it
- approximate course duration
- cautions and when not to use

### 4b. Exercises, actions, and symptom work

"Что болит?" must not answer only with recipes. Add practical non-drug supports:

- **Упражнения**: gentle movement, walking, breathing, posture, stretching where appropriate.
- **Действия**: warmth/cold, food order, water, sleep routine, light, pauses, rest positions.
- **Работа с симптомами**: what to track, possible triggers, when it gets worse/better.
- **Осторожно**: when not to do the action or exercise.

For stomach example:

- after food: 5-10 minutes of calm walking, no bending or strength load;
- breathing: 2-3 minutes of slow belly breathing, soft long exhale;
- warmth: warm compress on the abdomen for 10-15 minutes if warmth helps;
- symptom work: track for 3 days coffee, spicy food, dairy, bread, large portions, stress, and pain timing.

Use the same practical card style for actions as for recipes. Do not separate them as clickbait or "unexpected tricks"; they are ordinary целебные средства, just less widely known.

1. **Название**: short clear action name.
2. **Что делать**: exact protocol, duration, frequency.
3. **Почему может работать**: simple physiology.
4. **Что отслеживать**: pulse, sleep, pain, sugar response, cravings, tension.
5. **Кому осторожно**: clear safety boundary.
6. **Источник**: study/review/guideline where possible.

Examples:

- Sugar/energy: "10 минут спокойной ходьбы после сладкого ужина". Walk calmly 10 minutes 10-30 minutes after eating. Mechanism: working muscles use glucose and can reduce post-meal spikes.
- Stress/hormonal rhythm: "1 минута утром: вдох 4, выдох 8". 5 cycles. Mechanism: slow breathing with longer exhale can shift autonomic/vagal tone markers.
- Immunity/stress: "20 минут в зеленой среде". Slow walk or sit among trees, no phone. Mechanism: stress downshift; forest-bathing studies report changes in stress and immune markers.
- Chronic conditions: "умеренная силовая нагрузка". 2-3 times/week, gradual load. Mechanism: muscles improve glucose storage, strength, resilience, and metabolic health markers.

### 5. Red flags

Keep it short and prominent.

Examples:

- severe or sudden pain
- pain with fever, vomiting, blood, fainting, chest pain, shortness of breath
- pregnancy with concerning symptoms
- repeated or persistent symptoms
- known serious condition or strong medicines

### 6. Quick clarification

Ask only if it changes the answer.

Examples:

- "Сильно или терпимо?"
- "После еды или постоянно?"
- "Где именно: верх живота, низ, справа, слева?"
- "Как давно?"

In Telegram, use 2-4 buttons plus "Написать своими словами".

### 7. What can support today

Give safe, practical first steps:

- gentle food
- drink
- rest / movement
- what to avoid for now

### 8. Products and combinations

Show 3-5 product cards:

- why it may help
- how to use
- caution

### 9. Optional pantry mode

Button:

"Подобрать из того, что есть дома"

User writes:

"гречка, кефир, ромашка, лен, кофе"

App responds:

- подходит
- осторожно
- лучше не сегодня
- чего не хватает

### 10. Sources

Show:

- "медицинская безопасность"
- "пищевая польза"
- "народная традиция"
- "доказательность"

## Example: stomach discomfort

User:

"Болит желудок"

Answer:

**Если началось недавно**  
Если боль терпимая и похожа на тяжесть после еды, можно попробовать мягкую еду, теплую воду маленькими глотками, небольшие порции и покой.

**Если длится давно или часто повторяется**  
Показывать народные схемы поддержки, которые традиционно применяют курсом: слизистые отвары, мягкие травяные настои, обволакивающие растения и спокойная еда. При сильной боли, крови, похудении, ночной боли, рвоте, черном стуле или стойком ухудшении нужно выяснять причину медицински.

**Что может помочь сейчас**  
Овсянка, рис, гречка, легкий суп. Из напитков: теплая вода, ромашка или мята, если они подходят.

**Пока осторожно**  
Кофе, алкоголь, острое, жареное, очень кислое, большие порции.

**Для долгой поддержки при давних жалобах**  
Давать не общие слова, а конкретные народные схемы:

- овсяный отвар: 2 ст. л. овса или хлопьев на 500 мл воды, томить 20-30 минут, процедить, пить теплым по 50-100 мл 3-5 раз в день, лучше до еды, курс 7-14 дней;
- льняная слизь: 1 ч. л. молотого или цельного льна на 200 мл теплой воды, настоять 20-30 минут, пить вместе со слизистой водой, начинать 1 раз в день, не сухими семенами;
- корень алтея: 1 ч. л. сухого корня на стакан прохладной воды, настоять 1-2 часа, процедить, пить небольшими порциями; разносить с лекарствами на 2 часа;
- ромашка: 1 ч. л. сухих цветков на 200 мл горячей воды, настоять 10-15 минут, пить теплой после еды;
- ромашка + мята: по 1/2 ч. л. на стакан, настоять 10 минут; мяту не выбирать, если от нее усиливается изжога;
- кефир/йогурт: только если молочные продукты хорошо переносятся;
- гречка/рис: спокойная основа еды в дни чувствительного желудка.

Формулировка: "традиционно применяют для поддержки слизистой и пищеварительного комфорта", не "вылечит гастрит/язву/H. pylori".

**Когда не ждать**  
Если боль резкая, усиливается, есть температура, рвота, кровь, черный стул, обморок, боль в груди, беременность или боль повторяется часто, лучше обратиться за медицинской помощью.

**Что может подойти**  
Овес, рис, гречка, ромашка, мята, лен в малом количестве с водой, кефир только если хорошо переносится.

**Народная традиция**  
Ромашка, мята, овес и лен часто встречаются в мягкой домашней традиции для пищеварительного комфорта, но это не лечение причины боли.

**Кнопки**  
- Подобрать из того, что есть дома
- Показать мягкие продукты
- Когда точно к врачу
- Источники

## UI behavior

Autocomplete should support both symptoms and plain phrases:

- "болит же..." -> "желудок"
- "жив..." -> "живот"
- "изж..." -> "изжога"
- "тяж..." -> "тяжесть после еды"

But free text must still work. If the app is unsure, it should ask one clarifying question:

"Вы про желудок/верх живота, кишечник/вздутие или изжогу?"

## Content safety

Forbidden:

- "лечит гастрит"
- "вылечит желудок"
- "заменяет врача"
- "снимает риск на X%"
- "рубает сахар"

Allowed:

- "может поддержать пищеварительный комфорт"
- "можно попробовать при легкой тяжести после еды"
- "если нет тревожных признаков"
- "при повторяющейся боли лучше выяснить причину с врачом"

## Source anchors

Use official medical/self-care sources for red flags and escalation:

- NHS / national health services
- Mayo Clinic
- Cleveland Clinic
- MedlinePlus

Use food and herb sources for products:

- USDA FoodData Central
- WHO healthy diet
- NCCIH herbs
- NIH ODS
- EMA herbal monographs
- Russian scientific/traditional sources listed in `open_sources_and_db_structure.md`
