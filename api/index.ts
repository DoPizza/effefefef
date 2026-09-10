import * as http from "node:http";

export default (_req: http.IncomingMessage) => {
  return {
    body: JSON.stringify({
      status: "success",
      message: "Backend работает!",
    }),
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  };
};
