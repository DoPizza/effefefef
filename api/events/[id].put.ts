
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export default async (request: Request) => {

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };


    try {

        if (!supabaseUrl || !supabaseKey) {

            return {
                status: 500,

                body: JSON.stringify({
                    error: "SUPABASE_URL или SUPABASE_KEY не настроены",
                }),

                headers,
            };

        }


        // Получаем ID из URL
        const url = new URL(request.url);

        const parts =
            url.pathname
                .split("/")
                .filter(Boolean);

        const id =
            parts[parts.length - 1];


        if (!id) {

            return {
                status: 400,

                body: JSON.stringify({
                    error: "Не указан ID мероприятия",
                }),

                headers,
            };

        }


        const body =
            await request.json();


        const supabase =
            createClient(
                supabaseUrl,
                supabaseKey
            );


        const updateData = {

            title:
                body.title ?? null,

            description:
                body.description ?? null,

            start_date:
                body.start_date ?? null,

            end_date:
                body.end_date ?? null,

            price:
                body.price === ""
                    ? null
                    : body.price ?? null,

            image_url:
                body.image_url ?? null,

            source_url:
                body.source_url ?? null,

            broadcaster:
                body.broadcaster ?? null,

            status:
                body.status ?? "pending",

            "18+":
                body["18+"] === true,

        };


        const {
            data,
            error
        } = await supabase

            .from("events")

            .update(updateData)

            .eq("id", id)

            .select()

            .single();


        if (error) {

            return {
                status: 500,

                body: JSON.stringify({
                    error: error.message,
                }),

                headers,
            };

        }


        return {

            status: 200,

            body: JSON.stringify({
                ok: true,
                event: data,
            }),

            headers,

        };


    } catch (error) {

        return {

            status: 500,

            body: JSON.stringify({
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            }),

            headers,

        };

    }

};
