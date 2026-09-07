import * as http from "node:http";

const events = [
  {
    id: 1,
    title: "Тестовое мероприятие",
    status: "pending",
  },
];

export default async (req: http.IncomingMessage) => {
  try {
    const chunks: Buffer[] = [];

    for await (const chunk of req) {
      chunks.push(Buffer.from(chunk));
    }

    const rawBody = Buffer.concat(chunks).toString("utf-8");
    const body = JSON.parse(rawBody || "{}");

    if (!body.title) {
      return {
        body: JSON.stringify({
          status: "error",
          message: "Не указано название мероприятия",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      };
    }

    const event = {
      id: events.length + 1,
      title: body.title,
      status: "pending",
    };

    events.push(event);

    return {
      body: JSON.stringify({
        status: "success",
        message: `Мероприятие "${body.title}" добавлено!`,
        event,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    };
  } catch {
    return {
      body: JSON.stringify({
        status: "error",
        message: "Некорректный JSON",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    };
  }
};
