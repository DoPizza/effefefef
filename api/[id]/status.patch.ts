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


        const url =
            new URL(request.url);


        const parts =
            url.pathname
                .split("/")
                .filter(Boolean);


        // /api/events/123/status
        // последний элемент = status
        // предпоследний = ID

        const id =
            parts[parts.length - 2];


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


        const status =
            body.status;


        if (
            typeof status !== "string" ||
            status.trim() === ""
        ) {

            return {

                status: 400,

                body: JSON.stringify({
                    error: "Поле status обязательно",
                }),

                headers,

            };

        }


        const supabase =
            createClient(
                supabaseUrl,
                supabaseKey
            );


        const {
            data,
            error
        } = await supabase

            .from("events")

            .update({
                status: status.trim()
            })

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
