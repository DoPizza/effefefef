# Stormkit Test Backend

Минимальный тестовый backend для Stormkit.

## Endpoints

- `GET /api` — проверка backend
- `GET /api/events` — список мероприятий
- `POST /api/add-event` — добавить мероприятие

Пример POST:

```bash
curl -X POST https://YOUR-DOMAIN/api/add-event \
  -H "Content-Type: application/json" \
  -d '{"title":"Новое мероприятие"}'
```

Массив `events` находится в памяти serverless-функции и не является постоянной базой данных.
Проект предназначен для проверки деплоя и API.
