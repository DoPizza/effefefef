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
    },
    status: 200,
  };
};
