import 'module-alias/register';
import fastify, { FastifyInstance } from 'fastify';

import connectToMongo from '@mongo/connect';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const app: FastifyInstance = fastify({
  logger: true
});

connectToMongo();

app.register(userRoutes, { route: '/users' });
app.register(productRoutes, { route: '/products' });

app.listen({ port: 5000 }, (error) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
});
