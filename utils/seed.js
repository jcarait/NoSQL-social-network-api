const connection = require('../config/connection');
const User = require('../models/User');
const { getRandomUserName, getRandomEmail } = require ('./data');

console.time('seeding');

connection.once('open', async () => {
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 10; i++) {
    const username = getRandomUserName();
    const email = getRandomEmail();
    const newUser = {
      username: username,
      email: email
    };
    users.push(newUser);
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.timeEnd('seeding complete!');
  process.exit(0);
});