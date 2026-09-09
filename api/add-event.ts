
import * as http from "node:http";
import { createClient } from "@supabase/supabase-js";

export default async (req: http.IncomingMessage) => {
  try {
    if (req.method !== "POST") {
      return {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Method Not Allowed",
        }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "SUPABASE_URL или SUPABASE_KEY не настроены",
        }),
      };
    }

    const chunks: Buffer[] = [];

    for await (const chunk of req) {
      chunks.push(Buffer.from(chunk));
    }

    const rawBody = Buffer.concat(chunks).toString("utf-8");

    let body: any = {};

    if (rawBody) {
      body = JSON.parse(rawBody);
    }

    if (!body.title) {
      return {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Поле title обязательно",
        }),
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
        status: body.status ?? "pending",
        description: body.description ?? null,
        start_date: body.start_date ?? null,
        end_date: body.end_date ?? null,
        price: body.price ?? null,
        image_url: body.image_url ?? null,
        source_url: body.source_url ?? null,
        broadcaster: body.broadcaster ?? null,
        "18+": body["18+"] ?? null,
      })
      .select()
      .single();

    if (error) {
      return {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: error.message,
          details: error.details,
          hint: error.hint,
        }),
      };
    }

    return {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        event: data,
      }),
    };

  } catch (error) {
    return {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }),
    };
  }
};
