// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// export default async (request: Request) => {
//   try {
//     if (!supabaseUrl || !supabaseKey) {
//       return {
//         status: 500,
//         body: JSON.stringify({
//           error: "SUPABASE_URL или SUPABASE_KEY не настроены",
//         }),
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       };
//     }

//     const body = await request.json();

//     if (!body.title) {
//       return {
//         status: 400,
//         body: JSON.stringify({
//           error: "Поле title обязательно",
//         }),
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       };
//     }

//     const supabase = createClient(supabaseUrl, supabaseKey);

//     const { data, error } = await supabase
//       .from("events")
//       .insert({
//         title: body.title,
//         status: body.status || "pending",
//         description: body.description || null,
//         event_date: body.event_date || null,
//         image_url: body.image_url || null,
//       })
//       .select()
//       .single();

//     if (error) {
//       return {
//         status: 500,
//         body: JSON.stringify({
//           error: error.message,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       };
//     }

//     return {
//       status: 201,
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       body: JSON.stringify({
//         error: error instanceof Error ? error.message : "Unknown error",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     };
//   }
// };




export default async () => {
  return {
    status: 201,
    body: JSON.stringify({
      ok: true,
      message: "POST /api/add-event работает",
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
};
