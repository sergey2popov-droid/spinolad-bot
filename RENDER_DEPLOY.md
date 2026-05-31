# Деплой Спинолада на Render

## Что уже подготовлено

- `render.yaml` описывает Render Web Service.
- `npm start` запускает сервер.
- `/health` отвечает для health check.
- SVG-схемы отдаются из `public/illustrations/`.
- Telegram webhook endpoint: `/telegram/webhook`.

## 1. Опубликовать проект в GitHub

Render Blueprint работает из Git-репозитория.

Если GitHub CLI авторизован:

```powershell
gh auth login
gh repo create spinolad-bot --private --source . --remote origin --push
```

Если через сайт:

1. Создать новый репозиторий `spinolad-bot`.
2. Запушить туда проект.
3. Проверить, что в корне есть `render.yaml`.

## 2. Создать сервис в Render

1. Открыть Render Dashboard.
2. New + -> Blueprint.
3. Выбрать репозиторий `spinolad-bot`.
4. Render прочитает `render.yaml`.
5. Создать сервис `spinolad-bot`.

Render использует:

- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

## 3. Environment variables

В Render -> сервис -> Environment добавить:

```env
NODE_ENV=production
TELEGRAM_BOT_TOKEN=<новый токен от BotFather>
APP_BASE_URL=https://<render-service-name>.onrender.com
```

`ADMIN_SECRET` Render может сгенерировать сам по `render.yaml`.

Важно: если токен уже попадал в чат, лучше перевыпустить его в BotFather через `/revoke`.

## 4. Проверить сервис

После деплоя открыть:

```text
https://<render-service-name>.onrender.com/health
```

Ожидаемый ответ:

```json
{
  "ok": true,
  "service": "celebnik"
}
```

Проверить API:

```text
https://<render-service-name>.onrender.com/api/answer?q=лопатки
```

## 5. Подключить Telegram webhook

На локальной машине, в PowerShell:

```powershell
$env:TELEGRAM_BOT_TOKEN="<новый токен от BotFather>"
$env:APP_BASE_URL="https://<render-service-name>.onrender.com"
npm run set:webhook
```

Ожидаемый результат:

```json
{
  "ok": true,
  "webhookUrl": "https://<render-service-name>.onrender.com/telegram/webhook"
}
```

После этого написать боту в Telegram:

```text
/start
```

## 6. Быстрые тесты в Telegram

- `/start`
- `лопатки`
- `программа на 3 дня`
- нажать `Стало легче`
- `/status`
- `/stop`
