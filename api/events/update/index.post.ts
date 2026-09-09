import { createClient } from "@supabase/supabase-js";

export default async (request: any) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    let body = request.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    body = body || {};

    const id = body.id;

    if (!id) {
      return {
        status: 400,
        body: JSON.stringify({
          error: "Не указан id мероприятия"
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
    }

    const fields = { ...body };
    delete fields.id;

    if (Object.keys(fields).length === 0) {
      return {
        status: 400,
        body: JSON.stringify({
          error: "Нет данных для изменения"
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
    }

    const { data, error } = await supabase
      .from("events")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return {
        status: 500,
        body: JSON.stringify({
          error: error.message,
          details: error.details,
          hint: error.hint
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
    }

    return {
      status: 200,
      body: JSON.stringify({
        ok: true,
        event: data
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({
        error: error instanceof Error
          ? error.message
          : "Ошибка обработки запроса"
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};
