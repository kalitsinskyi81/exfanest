import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

const configModule = ConfigModule.forRoot({
  // apply env file from config dir relatively ENV_FILE which was set via cross-env
  envFilePath: resolve('config', process.env.ENV_FILE),
  isGlobal: true
});

export default configModule;
