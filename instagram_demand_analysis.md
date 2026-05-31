# Instagram demand analysis for Telegram app

Source: user-provided performance data from Instagram account `@thesergeypopov`.

Important: these titles use strong viral hooks. For the Telegram app, convert them into safe, evidence-aware wording. The app should not repeat medical promises such as "lowers blood sugar by 70%", "balances hormones", "replaces immunomodulators", or "removes disease risk" as factual claims unless a specific source proves a legally safe nutrition/health claim.

## Provided topics

| Rank | Topic title from Instagram | Views | Demand signal | Safe app interpretation |
|---:|---|---:|---|---|
| 1 | "Одна минута в день и гормоны приходят в баланс" | 2,300,000 | Extremely high | Users want simple daily rituals for hormonal wellbeing, stress, energy, sleep, weight, libido, and age-related changes. |
| 2 | "Биохимик случайно вскрыла правило, которое рубит сахар в крови на 70%. Это почти бесплатно" | 954,000 | Very high | Users strongly care about blood sugar, insulin response, cravings, energy crashes, and affordable food order/meal-composition rules. |
| 3 | "Три напитка, которые меняют тебя изнутри" | 89,000 | Medium | Users like compact lists of functional drinks: herbal teas, berry drinks, fermented drinks, cocoa/green tea, mineral-rich infusions. |
| 4 | "Всего одна ложка в день заменяет дорогие биодобавки и иммуномодуляторы" | 75,000 | Medium | Users want affordable "one spoon a day" natural products: seeds, oils, fermented foods, honey/pollen-like products, berry concentrates. Must avoid "replaces medicine/supplements" wording. |
| 5 | "Дешевый продукт, который снимает риски заболевания на 78 процентов" | 37,000 | Low-medium | Users respond to cheap accessible products and risk-reduction framing, but the exact claim must be verified before reuse. |
| 6 | "Эндокринолог предостерегла мужчин от специи, которая может съедать память" | 16,000 | Low | Fear/caution hook alone performs weaker here. Keep caution cards, but do not build the MVP around scary "avoid this spice" content. |

## What the audience seems to want

The strongest themes are not "rare herbs" first. They are simple, practical, cheap actions with a body-system promise:

- metabolic health: sugar, insulin response, cravings, stable energy
- hormonal wellbeing: daily rituals, stress, sleep, men's health, women's cycles, age-related changes
- affordable natural products: "cheap", "one spoon", "almost free"
- short lists: "3 drinks", "one product", "one minute"
- internal transformation language: "from inside", "balance", "clean energy"

This means the first Telegram app should not feel like an encyclopedia. It should feel like a practical search-and-answer assistant:

- "Что съесть, чтобы сахар после еды был ровнее?"
- "Какие напитки поддерживают сон и спокойствие?"
- "Что добавить по 1 ложке в день?"
- "Что выбрать для энергии без скачков?"
- "Какие продукты полезны мужчинам после 35?"
- "Какие травы и дикоросы подходят для чая?"

## Product implications

### Navigation decision

Use only three visible entry points in Telegram:

1. "Что болит?"
2. "Что съесть?"
3. "Что есть дома?"

Reason: the Instagram data shows people respond to direct practical situations, not to a large encyclopedia. Too many rubrics will make the bot feel heavy. The app should behave like a smart народный целебник: user writes a problem or a product, and the app finds the useful path.

Best core scenario:

1. User taps "Что болит?".
2. User types "жел..." and sees suggestions: желудок, желчь, железо/анемия.
3. User selects "желудок".
4. App asks: "Что есть дома? Напишите через запятую."
5. User writes: "гречка, кефир, ромашка, лен, кофе".
6. App answers:
   - what can support today
   - what to use carefully
   - what to avoid today
   - when to see a doctor
   - sources

This makes the app personally useful even without a complex user profile.

### MVP priority sections

1. Sugar and energy
2. Hormonal wellbeing
3. Functional drinks
4. One-spoon products
5. Cheap useful products
6. Women's health: cycle, iron, energy, mood, skin, menopause
7. Men's health and cognition
8. Stomach and gut comfort
9. Caution and contraindications

### New benefit areas to add

- blood_sugar_after_meals
- insulin_response_support
- cravings_control
- hormone_wellbeing
- women_wellbeing
- cycle_comfort_support
- iron_folate_support
- menopause_wellbeing
- stress_cortisol_rhythm
- male_vitality
- cognitive_support
- affordable_daily_habits
- functional_drinks
- stomach_comfort
- bloating_support
- gut_regular_support

### Recommended first content collections

Create collections as curated answers, not just product pages:

| Collection | User promise | Example products or rituals to research |
|---|---|---|
| "Сахар без качелей" | Food order and meal combinations for steadier post-meal energy | vegetables first, protein/fiber first, oats, legumes, vinegar-containing salads, cinnamon, berries, nuts |
| "Гормоны и ритм дня" | Daily food and lifestyle supports for stress/sleep/energy | breakfast protein, magnesium-rich foods, seeds, fatty fish, sleep ritual teas, morning light, short movement |
| "3 напитка на каждый день" | Simple functional drinks by goal | ivan-tea, rosehip infusion, berry mors, cocoa, green tea, fermented drinks |
| "Одна ложка" | Small daily additions with nutrient density | ground flaxseed, chia, pumpkin seeds, olive/flax oil, fermented vegetables, berry puree |
| "Дешево и сильно" | Affordable foods with strong nutrient value | cabbage, beet, buckwheat, oats, lentils, garlic, onion, kefir, frozen berries |
| "Мужчинам 35+" | Metabolism, cognition, vessels, energy, prostate-aware caution | pumpkin seeds, walnuts, cocoa, fatty fish, greens, legumes; caution around alcohol/sugar/overuse of concentrated spices |
| "Женское здоровье без мифов" | Cycle comfort, iron/folate support, skin, mood, menopause-aware nutrition | lentils, buckwheat, greens, berries, flaxseed, sesame, fatty fish, eggs, fermented foods, rosehip |
| "Желудок: что можно сегодня" | Gentle food/drink options for stomach comfort; red flags first | oats, rice, soup, kefir/yogurt if tolerated, chamomile, mint, flaxseed gel-like drinks; caution with acute pain/ulcer symptoms |

## Content style rules from the data

Use these formats in Telegram answers and future Instagram/TikTok posts:

- "1 правило"
- "3 напитка"
- "1 ложка в день"
- "дешевый продукт"
- "почти бесплатно"
- "для сахара после еды"
- "для гормонального ритма"
- "для энергии без отката"

Avoid or soften:

- exact dramatic percentages unless verified by a primary source
- "заменяет иммуномодуляторы"
- "лечит", "снимает риск", "рубает сахар"
- fear-only titles without a practical replacement

## Database changes suggested by this data

Add fields to `product_benefits`:

- `viral_angle_ru`: short user-friendly hook
- `safe_claim_ru`: compliant version of the hook
- `instagram_evidence_note`: which post/topic inspired this card
- `priority_score`: content priority from audience demand

Add table `demand_signals`:

- id
- source_platform
- source_account
- source_title
- views
- topic_cluster
- inferred_user_need
- safe_app_category
- priority_score
- created_at

Priority formula for the current dataset:

`priority_score = log10(views + 1) * strategic_fit`

Where `strategic_fit`:

- 1.3 for food/product/app-search fit
- 1.1 for drink/recipe fit
- 1.0 for broad wellness ritual
- 0.7 for fear/caution-only hook

Approximate priority:

| Topic cluster | Views | Strategic fit | Product priority |
|---|---:|---:|---:|
| hormonal wellbeing / daily ritual | 2,300,000 | 1.0 | highest |
| blood sugar / meal rules | 954,000 | 1.3 | highest |
| functional drinks | 89,000 | 1.1 | medium |
| one-spoon products | 75,000 | 1.3 | medium |
| cheap product / disease-risk framing | 37,000 | 1.3 | medium |
| spice caution / memory | 16,000 | 0.7 | low |

## First 30 cards to build from demand

Blood sugar and energy:

- oats
- buckwheat
- lentils
- chickpeas
- beans
- cabbage
- sauerkraut
- berries
- apple cider vinegar / vinegar-containing salad dressing
- cinnamon
- nuts
- flaxseed

Hormonal wellbeing and stress rhythm:

- pumpkin seeds
- walnuts
- fatty fish
- eggs
- greens
- legumes
- cocoa
- chamomile
- mint
- thyme
- magnesium-rich foods

Functional drinks and Russian tradition:

- ivan-tea / fireweed
- rosehip infusion
- cranberry mors
- lingonberry mors
- sea-buckthorn drink
- green tea
- cocoa
- kefir
- oat drink / oat decoction tradition
- dried-fruit infusion

One-spoon products:

- ground flaxseed
- chia seed
- pumpkin seeds
- sesame
- olive oil
- flaxseed oil
- fermented cabbage
- berry puree
- honey as food, not medicine

Women's health:

- lentils
- buckwheat
- greens
- sesame
- pumpkin seeds
- flaxseed
- berries
- rosehip
- eggs
- fatty fish
- fermented foods

Stomach and gut comfort:

- oats
- rice
- buckwheat
- soup with vegetables
- kefir or yogurt if tolerated
- fermented vegetables in small amounts if tolerated
- chamomile
- mint
- flaxseed

## "One spoon", "one glass", "one plate" matrix

The viral hook can be kept, but the promise must become specific and honest.

| Format | Example | What it may support | Safety wording |
|---|---|---|---|
| 1 spoon | ground flaxseed | fiber, stool regularity, satiety, omega-3 ALA | start small, drink water, caution with gut sensitivity and medicines |
| 1 spoon | pumpkin seeds | magnesium, zinc, protein, men's and women's daily mineral support | calorie-dense; avoid if allergy |
| 1 spoon | sesame | calcium, minerals, taste for salads/porridge | allergy risk; calorie-dense |
| 1 spoon | olive oil | unsaturated fats, salad absorption, heart-friendly eating pattern | calorie-dense; not a medicine |
| 1 glass | rosehip infusion | vitamin C-containing drink tradition | acidity can bother stomach; caution with kidney stones tendency |
| 1 glass | kefir | fermented food, protein, gut microbiome support if tolerated | lactose sensitivity; not for everyone |
| 1 glass | berry mors | hydration, berry polyphenols, replacement for soda | keep sugar low |
| 1 glass | ivan-tea | traditional herbal drink, caffeine-free ritual | check individual tolerance; evidence varies |
| 1 plate | buckwheat + vegetables + protein | stable satiety and energy | adjust for personal conditions |
| 1 plate | lentils + greens + lemon | fiber, plant protein, iron + vitamin C pairing | legumes may increase bloating; start gradually |

## Search-by-problem structure

This should be the main user path because people will come with "болит/беспокоит", not with a botanical taxonomy.

User entry examples:

- "болит желудок"
- "вздутие"
- "сахар скачет"
- "тянет на сладкое"
- "нет энергии"
- "плохо сплю"
- "ПМС"
- "кожа тусклая"
- "волосы"
- "мужская энергия"

Answer order:

1. Red flags: when food advice is not enough.
2. Gentle explanation: "This is not a diagnosis, but food can support comfort."
3. Today: 3 simple food/drink options.
4. One spoon / one glass / one plate.
5. Combinations.
6. What to avoid or test carefully.
7. Sources and evidence level.

Example for "болит желудок":

"Если боль резкая, с температурой, рвотой, кровью, сильной слабостью или повторяется часто, лучше обратиться к врачу. Если это обычная тяжесть или чувствительность после еды, можно начать мягко: теплая простая еда, овсянка или рис, суп, вода маленькими глотками, ромашка или мята если они вам подходят. Острые специи, алкоголь, много кофе и жирную тяжелую еду лучше временно убрать. Это поддержка, не лечение причины боли."

## Visual UX

The app should look like a bright practical catalog, not a medical directory.

Card types:

- product card with photo
- goal/symptom card with cover image
- one-spoon card
- one-glass card
- one-plate card
- caution card
- forest tradition card

Visual style:

- real photos of foods, berries, herbs, drinks, plates
- bright but natural colors
- simple icons for spoon, glass, plate, leaf, warning, source
- no scary medical images
- for wild plants: show edible part and identification caution

## Telegram answer examples

User: "Что помогает сахару после еды?"

Safe answer shape:

"Для более ровной энергии после еды обычно смотрят на 3 вещи: клетчатку, белок/жиры в начале приема пищи и меньше сладких напитков. Из продуктов можно рассмотреть овощи, бобовые, гречку, овес, ягоды, орехи, ферментированные овощи. Это не лечение диабета, а пищевые привычки, которые могут поддерживать более спокойный ответ организма на еду."

User: "Что пить каждый день?"

Safe answer shape:

"Можно выбрать напиток под задачу: шиповник или ягодный морс для вкуса и органических кислот, иван-чай как традиционный русский травяной напиток, зеленый чай или какао для полифенолов. Если есть давление, беременность, лекарства или чувствительный желудок, лучше проверить ограничения."

User: "Какая одна ложка самая полезная?"

Safe answer shape:

"Нет одной ложки, которая заменяет все добавки. Но есть маленькие ежедневные добавления с высокой пищевой ценностью: молотый лен, тыквенные семечки, кунжут, оливковое масло, ферментированная капуста. Выбор зависит от цели: пищеварение, энергия, сердце, кожа, мужское здоровье."
