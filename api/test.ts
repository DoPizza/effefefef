import { IncomingMessage } from "http";

export default async (req: IncomingMessage) => {
  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      ok: true,
      method: req.method,
      message: "TEST API WORKS",
    }),
  };
};
