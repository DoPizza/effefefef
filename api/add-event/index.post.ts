
import { createClient } from "@supabase/supabase-js";

export default async (request: any) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 500,
        body: JSON.stringify({
          error: "SUPABASE_URL или SUPABASE_KEY не настроены",
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    let body;

    if (typeof request.body === "string") {
      body = JSON.parse(request.body);
    } else {
      body = request.body || {};
    }

    if (!body.title) {
      return {
        status: 400,
        body: JSON.stringify({
          error: "Поле title обязательно",
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const { data, error } = await supabase
      .from("events")
      .insert({
        title: body.title,
        status: body.status || "pending",
        description: body.description || null,

        start_date: body.start_date || null,
        end_date: body.end_date || null,

        price: body.price ?? null,

        image_url: body.image_url || null,
        source_url: body.source_url || null,

        broadcaster: body.broadcaster || null,

        "18+": body["18+"] ?? null,
      })
      .select()
      .single();

    if (error) {
      return {
        status: 500,
        body: JSON.stringify({
          error: error.message,
          details: error.details,
          hint: error.hint,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    return {
      status: 201,
      body: JSON.stringify({
        success: true,
        event: data,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({
        error: error instanceof Error
          ? error.message
          : "Unknown error",
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
