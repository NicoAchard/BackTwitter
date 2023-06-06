const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");

faker.locale = "es";

module.exports = async () => {
  const users = await User.find();

  const tweets = [];
  for (let i = 0; i < 200; i++) {
    const userLikes = [];

    for (let i = 0; i < users.length; i++) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      userLikes.push(users[randomUserIndex]);
    }
    const randomAuthor = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
    const newTweet = new Tweet({
      content: faker.lorem.sentence(6),
      author: randomAuthor,
      createdAt: faker.date.past(),
      likes: userLikes,
    });
    tweets.push(newTweet);
    randomAuthor.tweetList.push(newTweet);
    await randomAuthor.save();
  }
  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweet.");
};
