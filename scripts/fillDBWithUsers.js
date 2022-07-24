const connectToMongo = require('../dist/mongo/connect').default;
const { createUser } = require('../dist/mongo/user/controller');
const mockUsers = require('../mock/users.json');

const fillDBWithUsers = async () => {
  await connectToMongo();

  for await (const user of mockUsers) {
    await createUser(user);
    console.log(user);
  }
};

fillDBWithUsers()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log('error', error);
    process.exit(1);
  });
