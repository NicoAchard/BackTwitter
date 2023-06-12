const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  let users = await User.find();
  for (let i = 0; i < 150; i++) {
    let usersDuplicate = users;
    // nuevo array duplicado para poder borrar al usuario de randomAuthor y que no se repita para randomAuthor2
    const randomFollower = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    // users = users.filter((user) => user.id != randomFollower.id);
    const randomFollowing = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    if (randomFollower.id !== randomFollowing.id) {
      const userCreate = randomFollowing;
      const userCreate2 = randomFollower;

      userCreate.following.push(userCreate2.id);
      userCreate2.followers.push(userCreate.id);

      await userCreate.save();
      await userCreate2.save();
    }
  }
};

console.log("[Database] Se corrió el seeder de Follow");
