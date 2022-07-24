const connectToMongo = require('../dist/mongo/connect').default;
const { getAllUsers } = require('../dist/mongo/user/controller');
const { createProduct } = require('../dist/mongo/product/controller');
const mockProducts = require('../mock/products.json');

const fillDBWithProducts = async () => {
  await connectToMongo();
  const users = await getAllUsers();

  for await (const product of mockProducts) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const userId = randomUser.id;

    await createProduct(userId, product);
    console.log({ userId, product: product });
  }
};

fillDBWithProducts()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log('error', error);
    process.exit(1);
  });
