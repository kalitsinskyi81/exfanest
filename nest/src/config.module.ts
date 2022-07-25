import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

const configModule = ConfigModule.forRoot({
  envFilePath: resolve('config', process.env.NODE_ENV),
  isGlobal: true
});

export default configModule;
