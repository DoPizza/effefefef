const events = [
  {
    id: 1,
    title: "Тестовое мероприятие",
    status: "pending",
  },
];

export default () => {
  return {
    body: JSON.stringify(events),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    status: 200,
  };
};
