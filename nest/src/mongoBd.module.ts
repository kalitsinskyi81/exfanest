import { MongooseModule } from '@nestjs/mongoose';

const MongoModule = MongooseModule.forRoot(process.env.MONGO_BD_CONNECTION_URI);

export default MongoModule;
