import { createClient } from "@supabase/supabase-js";

export default async (request: any) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 500,
        body: JSON.stringify({
          error: "SUPABASE_URL или SUPABASE_KEY не настроены"
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
    }

    let body;

    if (typeof request.body === "string") {
      body = JSON.parse(request.body);
    } else {
      body = request.body || {};
    }

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

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

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
        message: "Мероприятие удалено",
        id: id
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
