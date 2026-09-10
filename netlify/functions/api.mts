import type { Config } from "@netlify/functions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  return Response.json(
    {
      status: "success",
      message: "Backend работает!",
    },
    { headers: corsHeaders }
  );
};

export const config: Config = {
  path: "/api",
};
