# Telegram app content and UX concept

## Main principle

People will not open the app to read an encyclopedia. They will open it with a human problem:

- "болит желудок"
- "сахар после еды"
- "не могу уснуть"
- "нет энергии"
- "ПМС"
- "что пить утром"
- "что добавить по ложке"
- "какая ягода полезна"

The app should answer in a practical, structured, bright way:

1. Is this a red-flag situation?
2. What can I eat or drink today?
3. Which product helps which goal?
4. What combinations are better?
5. What should I be careful with?
6. What simple action or exercise can support this?
7. Why can this work, and what are the sources?

## First screen

No complex menu.

Search prompt:

"Что беспокоит или какой продукт ищем?"

Only three main buttons:

- Что болит?
- Что съесть?
- Что есть дома?

The app should avoid a large rubric wall. Telegram is cramped; the best interface is a smart text field with a few clear entry points.

## Main navigation

### 1. Что болит?

The user can type naturally:

- "желудок"
- "тяжесть"
- "вздутие"
- "сахар"
- "сон"
- "стресс"
- "ПМС"
- "горло"
- "нет энергии"

The app shows autocomplete suggestions after the first letters:

- "же" -> желудок, желчь, железо/анемия
- "вз" -> вздутие
- "са" -> сахар и энергия
- "со" -> сон
- "стр" -> стресс
- "пм" -> ПМС

After selecting or typing a problem, the app must answer immediately. It should not force the user to switch to another section.

Answer flow:

1. Safety check: red flags first.
2. Clarify lightly: ask 1-3 quick details only when needed.
3. Give immediate support: food, drink, rest, what to avoid today.
4. Offer optional next step: "Что есть дома?"
5. Show sources and evidence level.

Example:

User: "болит желудок"

Immediate answer:

- "Сначала проверьте тревожные признаки..."
- "Если боль легкая/после еды и нет красных флагов, можно попробовать..."
- "Сегодня мягче: овсянка/рис/гречка, простой суп, теплая вода, ромашка или мята если переносите."
- "Пока осторожно: кофе, алкоголь, острое, жареное, очень кислое."
- Button: "Подобрать из того, что есть дома"

Only after that the app asks, if the user wants:

"Что есть дома? Можно написать через запятую."

Example:

"гречка, лен, кефир, ромашка"

Then the app matches available products with the chosen problem.

### Symptom answer structure

The app should avoid saying "лечение желудка" as a promise. Better wording:

- "как помочь себе при дискомфорте"
- "пищевая поддержка"
- "что можно попробовать сегодня"
- "когда нужен врач"

For every symptom guide:

1. **Стоп-сигналы**  
   Short list of situations where food advice is not enough.

2. **Уточнить**  
   1-3 buttons or questions:
   - где болит?
   - как давно?
   - после еды или постоянно?

3. **Что можно сегодня**  
   3-5 practical actions.

4. **Что съесть**  
   Safe food options.

5. **Что выпить**  
   Safe drink options.

6. **Чего пока не надо**  
   Irritating or risky options.

7. **Народная традиция**  
   Herbs/foods traditionally used, clearly marked as tradition.

8. **Что говорит наука**  
   Short explanation and source links.

9. **Кнопка: что есть дома**  
   Optional personalization.

### 2. Что съесть?

In the visible Telegram UI this entry is named **Целебные средства**.

It includes:

- products
- herbs
- drinks
- folk recipes
- one spoon / one glass / one plate formats
- simple actions and exercises
- little-known supportive methods with sources

Exercises can be a separate main rubric on the start screen because users may start from body goals such as legs, heart, back, breathing, sugar, mobility, strength, or chronic conditions. But answers should still combine exercises with recipes, foods, herbs, drinks, and symptom-work prompts where useful.

The user enters a product, plant, berry, herb, drink, or dish:

- "лен"
- "гречка"
- "кефир"
- "шиповник"
- "иван-чай"

Autocomplete works by first letters and synonyms:

- "лен" -> лен, льняное семя, молотый лен
- "шип" -> шиповник, настой шиповника
- "кип" -> кипрей, иван-чай

The answer shows:

- what it may support
- how to use
- with what to combine
- who should be careful
- sources

### 3. Что есть дома?

The user writes a list:

"овсянка, мед, кефир, ромашка, яблоки"

The app responds:

"Что беспокоит?"

Then it proposes only from available items:

- what fits the problem
- what is neutral
- what is better to avoid today
- what could be added next time

This is the key "home remedy from pantry" scenario, but with safe wording: not "how to cure", but "what can support you today and when to see a doctor".

## Card structure

### Symptom or goal card

Example: "Желудок и тяжесть"

Blocks:

- Red flag: "Когда не ждать"
- Today: "Что можно попробовать сегодня"
- One spoon / one glass / one plate
- Best combinations
- Avoid for now
- Why it may help
- Tradition
- Evidence
- Sources

### Product card

Example: "Лен"

Blocks:

- What it is
- What it may support
- How to use
- Best combinations
- One-spoon format
- Who should be careful
- Russian/traditional note
- Evidence level
- Sources

### Drink card

Example: "Шиповник"

Blocks:

- What it is
- Taste and format
- When people use it
- One-glass format
- Combinations
- Caution
- Sources

## Practical user paths

### Path 1: "У меня болит желудок"

Bot answer:

1. Show red flags first.
2. If no red flags, offer gentle food options:
   - oats or rice
   - simple soup
   - warm water
   - chamomile or mint if tolerated
3. Show "avoid today":
   - alcohol
   - very spicy food
   - heavy fried food
   - too much coffee
4. Offer product cards:
   - oats
   - rice
   - chamomile
   - flaxseed
   - kefir if tolerated

### Path 2: "Сахар скачет"

Bot answer:

1. Diabetes/medicine caution.
2. Food-order and meal-composition tips:
   - fiber-rich vegetables
   - protein and fat with carbs
   - legumes, buckwheat, oats
   - berries instead of sweets
   - short walk after meal as lifestyle support
3. Product cards:
   - lentils
   - buckwheat
   - oats
   - cabbage
   - berries
   - cinnamon with caution

### Path 3: "Женское здоровье"

Subtopics:

- cycle comfort
- iron and energy
- skin and hair
- mood and stress
- menopause wellbeing

Product cards:

- lentils
- buckwheat
- greens
- rosehip
- sesame
- pumpkin seeds
- flaxseed
- eggs
- fatty fish
- fermented foods

### Path 4: "Мужское здоровье"

Subtopics:

- energy
- cognition
- vessels
- zinc/mineral support
- metabolic health

Product cards:

- pumpkin seeds
- walnuts
- cocoa
- legumes
- fatty fish
- greens
- berries
- buckwheat

### Path 5: "1 ложка в день"

The answer should ask: "Для чего?"

Options:

- пищеварение: ground flaxseed
- минералы: pumpkin seeds or sesame
- сердце-friendly eating pattern: olive oil in salad
- вкус и ягоды: berry puree
- микробиота: fermented vegetables, small amount

No phrase like "one spoon replaces supplements".

### Path 6: "1 стакан"

Options:

- evening calm: chamomile or mint if tolerated
- Russian tradition: ivan-tea
- vitamin C-containing tradition: rosehip infusion
- berry drink: cranberry/lingonberry mors with low sugar
- fermented: kefir if tolerated
- focus/energy: cocoa or green tea, with caffeine caution

## Visual plan

Every content unit should have a visual:

- product photo
- drink photo
- dish photo
- forest plant photo
- simple icon for spoon/glass/plate
- warning icon for caution
- source icon for evidence

Image types:

- `product_photo`: clean food photo on light background
- `forest_photo`: natural plant/berry in forest context
- `drink_photo`: cup/glass/jar, bright and appetizing
- `dish_photo`: real simple plate, not restaurant styling
- `caution_visual`: simple warning banner, no scary medical imagery

For generated images:

- show the actual product clearly
- avoid fake botanical details for wild plants unless verified by reference
- for dangerous lookalikes, use real sourced photos only
- keep colors warm, natural, high contrast

## Tone

The app should feel:

- practical
- warm
- bright
- evidence-aware
- rooted in Russian food/traditional culture
- not medical, not dry, not mystical

Good phrase:

"Можно рассмотреть как пищевую поддержку."

Bad phrase:

"Вылечит желудок."

Good phrase:

"Если боль сильная или повторяется, сначала врач. Если речь о легкой тяжести после еды, можно начать с более мягкой еды и напитков."

Bad phrase:

"Этот чай лечит гастрит."
