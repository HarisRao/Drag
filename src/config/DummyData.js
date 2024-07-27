export const msgData = [
  {
    _id: 123,
    text: "last text Message",
    createdAt: new Date(),
    user: {
      _id: Math.random() * 1000,
      name: "User One",
      avatar: require("../assets/images/user.png"),
    },
  },
  {
    _id: 12345,
    text: "last text Message 2",
    createdAt: new Date(),
    user: {
      _id: "63aa0d4bdd1cca56e1ac6f4e",
      name: "User One",
      avatar: require("../assets/images/user.png"),
    },
  },
];
