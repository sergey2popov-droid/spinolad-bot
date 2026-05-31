# Telegram app: open sources and database structure

## Product idea

The app should answer two simple user intents:

1. "What is useful about this product, berry, herb, or dish?"
2. "What natural foods may support this goal: digestion, sleep, energy, stress, skin, immunity, heart, liver, joints?"
3. "What simple action, movement, breathing, warmth/cold, routine, or household practice may support this state?"

The wording must avoid medical promises. Use phrases like "may support", "is a source of", "is traditionally used for", "evidence is limited", and "ask a healthcare professional if you have a condition, pregnancy, allergies, or take medicines".

For symptom-style queries such as "болит желудок", use `symptom_response_framework.md`. The "Что болит?" flow must answer immediately with red flags, safe support steps, products/drinks, cautions, and sources. "Что есть дома?" is a separate entry and also an optional personalization button inside symptom answers.

## Recommended open sources

### Core food composition

| Source | Use in app | Link |
|---|---|---|
| USDA FoodData Central | Nutrients, calories, protein/fat/carbs, vitamins, minerals, fiber. Good machine-readable API. | https://fdc.nal.usda.gov/api-guide |
| Open Food Facts | Packaged products, ingredients, allergens, labels, barcode lookup. Useful later, not for the first natural-food MVP. | https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/ |

### Healthy eating principles

| Source | Use in app | Link |
|---|---|---|
| WHO Healthy diet | General guidance: fruits, vegetables, legumes, nuts, whole grains; limits on salt, sugars, saturated/trans fats. | https://www.who.int/news-room/fact-sheets/detail/healthy-diet |
| CDC Nutrition | Simple public-health explanations for healthy eating patterns. | https://www.cdc.gov/nutrition/features/healthy-eating-tips.html |
| НМИЦ ТПМ Минздрава России | Russian-language healthy eating recommendations and public-health framing. | https://gnicpm.ru/articles/center_news/opublikovany-rekomendaczii-zdorovoe-pitanie-kak-sledovat-raczionu-zdorovogo-pitaniya-kazhdyj-den-iz-serii-pitanie-i-zdorove.html |

### Herbs, botanicals, supplements, cautions

| Source | Use in app | Link |
|---|---|---|
| NCCIH Herbs at a Glance | Short herb profiles: common names, what science says, side effects, cautions. Good for plant cards. | https://www.nccih.nih.gov/health/herbsataglance |
| NCCIH Dietary and Herbal Supplements | Safety framing and supplement/herb caution language. | https://www.nccih.nih.gov/health/supplements |
| NIH Office of Dietary Supplements | Vitamins, minerals, botanicals, probiotics; dosage/safety background. | https://ods.od.nih.gov/factsheets/ |
| EMA herbal monographs | EU herbal monographs and traditional-use references. More formal and careful. | https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries |

### Evidence and claim control

| Source | Use in app | Link |
|---|---|---|
| PubMed / NCBI APIs | Search scientific literature and attach references to claims. | https://www.ncbi.nlm.nih.gov/home/develop/api/ |
| EU Register of Health Claims | Check which nutrition/health claims are authorised or not authorised in the EU. Useful to avoid risky marketing claims. | https://food.ec.europa.eu/food-safety/labelling-and-nutrition/nutrition-and-health-claims/eu-register-health-claims_en |
| EFSA health claims explanation | Consumer-friendly explanation of health/nutrition claims and evidence checks. | https://www.efsa.europa.eu/en/safe2eat/health-claims |

### Russian scientific and traditional sources

Use these sources as a separate "Russian forest and herbal tradition" layer. They are valuable, but they should not all be treated the same way: some are scientific or institutional sources, while others are culinary, ethnobotanical, historical, or popular references.

| Source | Type | Use in app | Link |
|---|---|---|---|
| ВИЛАР, Всероссийский НИИ лекарственных и ароматических растений | Russian scientific institution | Main Russian scientific anchor for medicinal and aromatic plants, cultivation, raw material quality, and plant research. | https://vilarnii.ru/ |
| "Вопросы питания" / ФИЦ питания и биотехнологии | Russian food science | Food safety, contaminants, regulatory and toxicology background. Useful for caution sections. | https://www.voprosy-pitaniya.ru/ru/jarticles_diet/810.html |
| "Дикорастущие полезные растения СССР", РГО library | Historical botanical/reference | Descriptions of useful wild plants: medicinal, food, technical plants; gathering, drying, preparation. Use as historical/traditional context. | https://elib.rgo.ru/handle/123456789/230103 |
| "Дикорастущие лекарственные растения СССР" | Soviet-era herbal reference | Plant distribution, harvesting, drying, chemical composition, active substances, traditional/medical use. Use for reference, then verify safety and claims. | https://libarch.nmu.org.ua/handle/GenofondUA/70158 |
| Питенев И.В., "Лесная кухня", 1989 | Forest cuisine / practical tradition | Mushrooms, berries, wild edible plants, gathering cautions, processing, recipes. Good for recipe and "forest kitchen" sections. | https://libarch.nmu.org.ua/handle/GenofondUA/68605 |
| Иванова Т.Н., Путинцева Л.Ф., "Лесная кладовая", 1993 | Forest foods and processing | Wild fruits, berries, mushrooms, edible plants, domestic preservation and recipes. Good culinary source; avoid copying recipes verbatim. | https://search.rsl.ru/ru/record/01001671517 |
| "Дикорастущие пищевые растения в быту у горных башкир и народов Южной Сибири" | Ethnobotany | Regional food traditions and practical use of wild plants. Useful for cultural notes. | https://elibrary.asu.ru/xmlui/handle/asu/1980 |
| "Дикорастущие пищевые растения юго-западной части острова Сахалин" | Scientific article | Regional list of 104 wild edible plant species; helps expand flora by region. | https://sciup.org/dikorastushhie-pishhevye-rastenija-jugo-zapadnoj-chasti-ostrova-sahalin-170201600 |
| "Потенциал флоры Кемеровской области как источника сырья для пищевой биотехнологии", 2024 | Scientific article | Modern regional analysis; mentions 335 wild food plant species in Kemerovo region. | https://journal.asu.ru/bpssm/article/view/pbssm.2024140 |
| "Влияние замораживания на сохранность БАВ в плодах и ягодах дикорастущих растений" | Food technology / research | Processing and storage: freezing can greatly reduce some bioactive compounds; useful for "how to preserve" notes. | https://elsu.ru/agrotech/issues/229/articles/3006/ |
| "Современные возможности применения кипрея узколистного", 2025 | Scientific review | Ivan-tea/fireweed, fermented raw material, functional nutrition. Useful for a flagship Russian traditional beverage card. | https://journals.eco-vector.com/1560-9596/article/view/687945 |
| "Кофе и Чай в России": Ivan-tea from myths to reality | Industry/science-popular | Good myth-control source for Koporye/Ivan-tea history and chemistry. | https://coffeetea.ru/2018/03/02/4430/ |
| WHO Traditional Medicine Strategy 2025-2034 | International policy | Traditional medicine can be included, but should be evidence-aware, standardized, and safe. | https://www.who.int/teams/integrated-health-services/traditional-complementary-and-integrative-medicine/global-strategies |
| NCCIH Ayurveda overview | Evidence/safety for Ayurveda | Ayurveda can be referenced as a tradition, but evidence is limited for many conditions; safety and heavy-metal contamination cautions matter. | https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth |

## Russian tradition layer

Add a separate source layer to each plant card:

- `modern_nutrition`: nutrient composition and public-health guidance
- `modern_botanical_research`: phytochemistry, plant raw material quality, food technology
- `russian_tradition`: old Russian/Soviet herbal references, forest cuisine, household recipes
- `regional_ethnobotany`: Siberia, North, Volga, Ural, Far East, Caucasus, etc.
- `ayurveda_or_other_tradition`: Ayurveda/TCIM notes, only with careful safety labeling

Suggested user-visible labels:

- "Пищевая ценность"
- "Русская травная традиция"
- "Лесная кухня"
- "Что говорит современная наука"
- "Как заготовить"
- "Осторожно"

## Russian forest product categories

Add these categories to the MVP because they match the cultural direction of the app:

- wild_berry: cranberry, lingonberry, bilberry, blueberry, cloudberry, sea buckthorn, rosehip, rowan, hawthorn, bird cherry, viburnum
- wild_green: nettle, goutweed, sorrel, fireweed shoots, dandelion leaves, plantain young leaves, wood garlic
- herbal_tea: ivan-tea/fireweed, linden blossom, thyme, oregano, mint, currant leaf, raspberry leaf, rosehip
- forest_mushroom: boletus, chanterelle, milk mushroom, honey fungus; include strong safety warnings
- root_and_rhizome: burdock root, dandelion root, calamus; food/tradition notes only when safe and verified
- forest_drink: mors, kissel, kvass-like fermented drinks, herbal infusion, berry decoction, dried-fruit infusion

## Traditional-source safety rules

1. Treat old herbals as cultural and historical sources, not as proof that something treats disease.
2. Every edible wild plant must have a "do not confuse with" section if dangerous lookalikes exist.
3. Every mushroom entry must start with safety and identification caution.
4. Do not provide instructions for treating serious diseases with herbs.
5. For pregnancy, children, chronic illness, allergies, blood pressure, anticoagulants, diabetes medicines, sedatives, kidney/gallbladder issues: show "ask a specialist".
6. Avoid copying recipes from copyrighted modern books. Convert them into original short recipe ideas with attribution as inspiration.

## Database structure

## Audience demand layer

Use `instagram_demand_analysis.md` as the first real demand signal from the audience of `@thesergeypopov`.

Top current signals:

- hormonal wellbeing / "one minute a day": 2.3M views
- blood sugar / cheap rule: 954K views
- functional drinks: 89K views
- one-spoon natural products: 75K views
- cheap accessible product: 37K views
- spice caution / memory: 16K views

MVP should prioritize practical searches and collections around:

- sugar and energy
- hormonal wellbeing
- functional drinks
- one-spoon products
- cheap useful products
- women's health, cycle comfort, iron, energy, skin, mood
- men's health, energy, cognition, vessels
- family everyday health: digestion, sleep, stress, immunity support
- cautions and contraindications

Do not reuse viral medical claims literally. Convert them into safe app categories:

- "рубит сахар" -> "поддержка более ровной энергии после еды"
- "гормоны приходят в баланс" -> "поддержка гормонального ритма, сна и стресса"
- "заменяет иммуномодуляторы" -> "пищевые продукты с высокой нутриентной плотностью"
- "снимает риски заболевания" -> "продукты в рамках здорового рациона"
- "специя съедает память" -> "осторожность, дозировки и индивидуальная чувствительность"

### products

Main object: a natural product, plant, berry, seed, nut, grain, spice, fermented food, or simple dish ingredient.

Fields:

- id
- slug
- name_ru
- name_en
- latin_name
- category
- short_description
- taste_profile
- common_forms
- seasonal
- source_priority
- created_at
- updated_at

Categories:

- fruit
- berry
- vegetable
- herb
- spice
- grain
- legume
- nut_seed
- fermented
- mushroom
- oil
- drink
- dish_base

### product_nutrients

Nutrient data, preferably from USDA FoodData Central.

Fields:

- id
- product_id
- source_id
- serving_size_g
- calories_kcal
- protein_g
- fat_g
- carbs_g
- fiber_g
- sugar_g
- potassium_mg
- magnesium_mg
- calcium_mg
- iron_mg
- zinc_mg
- vitamin_c_mg
- vitamin_a_mcg
- vitamin_e_mg
- folate_mcg
- data_note

### benefits

Reusable support areas, not diseases.

Fields:

- id
- slug
- name_ru
- user_phrase
- safe_description
- forbidden_claim_examples

Initial benefit areas:

- digestion_support
- gut_microbiome
- sleep_relaxation
- stress_resilience
- energy_tone
- immunity_support
- heart_vessels
- skin_hair
- joints_mobility
- liver_metabolism
- blood_sugar_balance
- blood_sugar_after_meals
- insulin_response_support
- cravings_control
- weight_management
- focus_memory
- cognitive_support
- hormone_wellbeing
- women_wellbeing
- cycle_comfort_support
- iron_folate_support
- menopause_wellbeing
- stress_cortisol_rhythm
- male_vitality
- affordable_daily_habits
- functional_drinks
- stomach_comfort
- gut_regular_support
- bloating_support
- liver_metabolism_support
- skin_glow_support
- hair_nails_support
- urinary_tract_support

### product_benefits

Connects products with benefit areas.

Fields:

- id
- product_id
- benefit_id
- claim_text_ru
- evidence_level
- mechanism_short
- cautions_short
- source_ids
- reviewed
- viral_angle_ru
- safe_claim_ru
- instagram_evidence_note
- priority_score

Evidence levels:

- A: strong public-health or established nutrient claim
- B: moderate human evidence
- C: preliminary or mixed evidence
- T: traditional use, limited modern evidence
- N: nutrient composition only, no direct health claim

### cautions

Safety notes and cases for "better ask a specialist".

Fields:

- id
- product_id
- caution_type
- text_ru
- severity
- source_ids

Caution types:

- allergy
- pregnancy_breastfeeding
- medication_interaction
- gastrointestinal_sensitivity
- kidney_gallbladder
- blood_pressure
- blood_sugar
- children
- overdose_or_concentrate

### combinations

Useful combinations of products.

Fields:

- id
- title_ru
- product_ids
- purpose_benefit_id
- why_it_works_ru
- recipe_short_ru
- evidence_level
- cautions_ru
- source_ids

Examples:

- oats + berries + nuts: fiber, polyphenols, healthy fats
- lentils + greens + lemon: plant protein, iron, vitamin C
- turmeric + black pepper + fat-containing food: absorption support; caution with medicines
- fermented vegetables + whole grains: fiber and fermented foods

### recipes

Simple practical formats.

Fields:

- id
- title_ru
- product_ids
- benefit_ids
- format
- prep_time_min
- ingredients_ru
- steps_ru
- suitable_for
- not_suitable_for
- notes_ru

Formats:

- tea
- infusion
- breakfast
- salad
- soup
- smoothie
- fermented
- snack
- dinner

### actions_exercises

Simple non-drug actions, exercises, routines, warmth/cold practices, breathing, and posture/movement suggestions. These are part of "Целебные средства", alongside foods, herbs, drinks, and recipes.

Fields:

- id
- slug
- title_ru
- benefit_ids
- symptom_guide_ids
- action_type
- short_instruction_ru
- duration_ru
- frequency_ru
- when_to_use_ru
- when_to_avoid_ru
- evidence_level
- tradition_note_ru
- source_ids

Extra fields for practical action cards:

- action_name_ru
- mechanism_ru
- exact_protocol_ru
- expected_marker_ru
- how_fast_ru
- safety_boundary_ru
- source_strength

Action types:

- breathing
- walking
- gentle_movement
- self_massage
- warmth
- cold
- posture
- sleep_routine
- food_order
- sunlight

Examples:

- 5-10 minutes of calm walking after meals for sugar/energy and digestion support
- warm compress on the abdomen if warmth eases stomach tension
- slow nasal breathing for stress before eating
- morning light for sleep rhythm
- legs-up rest or gentle stretching where appropriate

First action cards:

1. Post-meal walking for sugar/energy
   - action_name: "10 минут ходьбы после сладкого ужина"
   - protocol: walk calmly for 10 minutes 10-30 minutes after eating
   - mechanism: working muscles use glucose and support post-meal glucose handling
   - track: sleepiness after meals, cravings, CGM/glucose if user has it

2. Long-exhale breathing for stress/hormonal rhythm
   - action_name: "1 минута утром: вдох 4, выдох 8"
   - protocol: 5 cycles, inhale through nose 4 seconds, exhale slowly 8 seconds
   - mechanism: slow breathing and longer exhale can increase parasympathetic/vagal tone markers
   - track: morning pulse, tension, sleep onset, craving/stress response

3. Forest exposure / nature walk
   - action_name: "20 минут в зеленой среде"
   - protocol: 20 minutes slow walk or sitting among trees, no phone scrolling
   - mechanism: stress downshift, autonomic regulation, possible immune marker changes in longer forest-bathing studies
   - track: mood, pulse, sleep, tension

4. Moderate strength training
   - action_name: "умеренная силовая нагрузка"
   - protocol: 2-3 times/week, basic safe movements, gradual load
   - mechanism: muscle mass improves glucose storage, strength, insulin sensitivity, chronic disease resilience
   - track: energy, glucose response, waist, strength, pain tolerance

### symptom_work

Tracks and suggests practical work with symptoms: triggers, timing, relief patterns, and follow-up prompts.

Fields:

- id
- symptom_guide_id
- tracking_prompt_ru
- likely_triggers_ru
- relief_markers_ru
- duration_days
- escalation_rule_ru

Examples:

- stomach: track coffee, spicy food, dairy, bread, large portions, stress, pain timing for 3 days
- sugar/energy: track post-meal sleepiness, sweet cravings, breakfast composition, walking after meals
- sleep: track caffeine timing, screen/light, bedtime, evening food, herbal drink response

### sources

Traceability table.

Fields:

- id
- title
- organization
- url
- source_type
- accessed_at
- reliability_score
- notes

Source types:

- official_database
- public_health_guideline
- clinical_reference
- herbal_monograph
- scientific_literature
- regulatory_claim_register

### user_queries

For improving the product after launch.

Fields:

- id
- query_text
- detected_intent
- detected_product_id
- detected_benefit_id
- result_count
- created_at

### demand_signals

Tracks audience demand from Instagram, Telegram, YouTube, search queries, and future paid users.

Fields:

- id
- source_platform
- source_account
- source_title
- views
- likes
- comments
- saves
- shares
- topic_cluster
- inferred_user_need
- safe_app_category
- priority_score
- created_at

### symptom_guides

User-facing guides for "what bothers me" searches. These guides must be framed as food and lifestyle support, not diagnosis or treatment.

Fields:

- id
- slug
- user_phrase_ru
- body_system
- red_flags_ru
- safe_intro_ru
- first_food_steps_ru
- useful_products
- useful_drinks
- useful_combinations
- avoid_or_limit_ru
- when_to_see_doctor_ru
- source_ids
- illustration_prompt_ru

### symptom_aliases

Autocomplete and natural-language matching for "Что болит?".

Fields:

- id
- symptom_guide_id
- alias_ru
- normalized_alias
- starts_with
- user_language_level
- priority

Examples:

- желудок, живот, тяжесть, изжога tendency, тошнит
- вздутие, газы, бурлит
- сахар, тянет на сладкое, сонливость после еды
- сон, бессонница, не могу уснуть
- стресс, тревожность, напряжение
- ПМС, цикл, месячные, женское
- энергия, усталость, нет сил

### product_aliases

Autocomplete and synonym matching for "Что съесть?" and "Что есть дома?".

Fields:

- id
- product_id
- alias_ru
- normalized_alias
- starts_with
- priority

Examples:

- лен, льняное семя, молотый лен
- кипрей, иван-чай
- шиповник, настой шиповника
- овсянка, овес, геркулес
- квашеная капуста, ферментированная капуста
- гречка, гречневая крупа

### pantry_matches

Matches a user pantry list with a selected symptom/goal.

Fields:

- id
- symptom_guide_id
- product_id
- fit_level
- use_today_ru
- why_ru
- caution_ru
- avoid_if_ru
- combination_suggestion_ru
- missing_helpful_products_ru

Fit levels:

- good_fit: can be suggested for this goal if tolerated
- neutral: safe ordinary food but not a main suggestion
- use_carefully: may help some people, but caution is important
- avoid_today: likely to worsen this symptom or not suitable for current context

Example:

User problem: "желудок"

Home list: "гречка, лен, кефир, ромашка, кофе, острый соус"

Output:

- ромашка: good_fit, warm mild drink if tolerated
- гречка: good_fit, simple food option
- лен: use_carefully, start small and drink water
- кефир: use_carefully, only if dairy is tolerated
- кофе: avoid_today, may irritate sensitive stomach
- острый соус: avoid_today

Initial guide groups:

- желудок: heaviness, heartburn tendency, sensitive stomach
- кишечник: bloating, irregular stool, microbiome support
- сахар и энергия: post-meal sleepiness, cravings, energy crashes
- сон: evening calm, sleep ritual, caffeine timing
- стресс: calming drinks, magnesium-rich foods, stable meals
- женское здоровье: cycle comfort, iron/folate foods, skin/mood, menopause support
- мужское здоровье: energy, vessels, cognition, zinc-rich foods
- иммунная поддержка: vitamin C foods, fermented foods, protein, sleep
- кожа/волосы: protein, omega-3 foods, zinc, vitamin C, hydration
- суставы: protein, vitamin C foods, omega-3 foods, anti-inflammatory eating pattern

Red flags should be shown before suggestions when relevant:

- severe or acute pain
- blood in stool or vomit
- fever, persistent vomiting, dehydration
- sudden weight loss
- chest pain, shortness of breath
- pregnancy with concerning symptoms
- symptoms lasting more than several days or recurring often
- diagnosed diabetes, ulcers, kidney/liver disease, anticoagulants or other serious medicines

## User-facing card template

Product card:

- Name
- Short answer: "why people use it"
- Key nutrients or compounds
- May support
- Best combinations
- Simple use
- Caution
- Evidence level
- Sources

Symptom/goal guide card:

- "Что беспокоит?"
- "Когда не тянуть и идти к врачу"
- "Что можно попробовать в еде сегодня"
- "1 ложка / 1 стакан / 1 тарелка"
- "Лучшие сочетания"
- "Чего лучше не делать"
- "Почему это может поддержать организм"
- "Осторожно"
- "Источники"

Quick action formats:

- `one_spoon`: small daily additions, such as ground flaxseed, chia, sesame, pumpkin seeds, olive oil, fermented vegetables, berry puree
- `one_glass`: rosehip infusion, berry mors, kefir, cocoa, green tea, ivan-tea, dried-fruit infusion
- `one_plate`: buckwheat + vegetables + protein, lentils + greens + lemon, oats + berries + nuts, soup with legumes and herbs
- `one_minute`: breathing, short walk after meal, morning light, mindful pause before food; keep separate from food claims
- `three_options`: "3 drinks", "3 breakfasts", "3 products for evening calm", "3 cheap foods for fiber"

Benefit search result:

- "For digestion support"
- Top products
- What to combine
- What to avoid overpromising
- When to ask a professional

## First MVP dataset

Start with 60-80 entries:

- berries: cranberry, blueberry, sea buckthorn, rosehip, raspberry, blackcurrant, lingonberry
- herbs: mint, chamomile, sage, thyme, nettle, dandelion, ginger, turmeric
- vegetables: beet, carrot, cabbage, broccoli, garlic, onion, pumpkin
- grains/legumes: oats, buckwheat, lentils, chickpeas, beans
- nuts/seeds: flaxseed, chia, pumpkin seeds, walnut, almond
- fermented: kefir, yogurt, sauerkraut, kimchi
- spices: cinnamon, black pepper, cumin, coriander
- drinks: green tea, cocoa, hibiscus

Demand-prioritized first 30:

- sugar and energy: oats, buckwheat, lentils, chickpeas, beans, cabbage, sauerkraut, berries, vinegar-containing salad dressing, cinnamon, nuts, flaxseed
- hormonal wellbeing and stress rhythm: pumpkin seeds, walnuts, fatty fish, eggs, greens, legumes, cocoa, chamomile, mint, thyme
- functional drinks: ivan-tea/fireweed, rosehip infusion, cranberry mors, lingonberry mors, sea-buckthorn drink, green tea, cocoa, kefir, dried-fruit infusion
- one-spoon products: ground flaxseed, chia seed, pumpkin seeds, sesame, olive oil, flaxseed oil, fermented cabbage, berry puree, honey as food

## Telegram UX

Minimal interface:

- Search field: "Введите продукт или задачу"
- Buttons after answer:
  - "Сочетания"
  - "Осторожно"
  - "Рецепт"
  - "Источники"
  - "Похожие продукты"

Main commands:

- /start
- /product
- /goal
- /recipe
- /favorites

Premium features:

- saved favorites
- weekly natural-food plans
- "what to eat for my goal" collections
- expanded source explanations
- personal restrictions/allergies profile

Visual content requirements:

- every product card should have one image: real product/plant/berry/dish, not abstract decoration
- every symptom guide should have a bright cover image plus small icons for "food", "drink", "caution", "source"
- forest/traditional cards should show the actual plant and edible part; if there are lookalikes, include a warning image slot
- images must not imply disease treatment; show food, preparation, gathering, cup/plate context
- prioritize warm natural photography for Russian forest products and clean bright product photos for everyday foods

## Editorial rules

1. Do not say "treats", "cures", "heals disease".
2. Prefer "supports", "is a source of", "may help maintain".
3. Separate food from supplements and concentrated extracts.
4. Always show cautions for herbs, pregnancy, medicines, allergies.
5. Every claim must have at least one source or be marked as traditional/limited evidence.
