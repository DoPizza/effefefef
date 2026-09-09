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

        const url = new URL(request.url);

        const parts = url.pathname
            .split("/")
            .filter(Boolean);

        const id = parts[parts.length - 1];

        if (!id) {

            return {
                status: 400,

                body: JSON.stringify({
                    error: "Не указан ID мероприятия",
                }),

                headers,
            };

        }

        const body = await request.json();

        const updateData: Record<string, any> = {};

        /*
         * Обновляем только те поля,
         * которые реально передали.
         *
         * Это позволяет использовать:
         *
         * PUT /api/events/8
         * для полного редактирования
         *
         * и
         *
         * PUT /api/events/8
         * { "status": "approved" }
         *
         * только для изменения статуса.
         */

        if ("title" in body) {
            updateData.title = body.title;
        }

        if ("description" in body) {
            updateData.description = body.description;
        }

        if ("start_date" in body) {
            updateData.start_date = body.start_date;
        }

        if ("end_date" in body) {
            updateData.end_date = body.end_date;
        }

        if ("price" in body) {
            updateData.price =
                body.price === ""
                    ? null
                    : body.price;
        }

        if ("image_url" in body) {
            updateData.image_url = body.image_url;
        }

        if ("source_url" in body) {
            updateData.source_url = body.source_url;
        }

        if ("broadcaster" in body) {
            updateData.broadcaster = body.broadcaster;
        }

        if ("status" in body) {
            updateData.status = body.status;
        }

        if ("18+" in body) {
            updateData["18+"] = body["18+"] === true;
        }

        if (Object.keys(updateData).length === 0) {

            return {
                status: 400,

                body: JSON.stringify({
                    error: "Нет данных для обновления",
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
