import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import ConfigModule from './config.module';
import MongoModule from './mongoBd.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule, TokenModule, MongoModule, MailModule],
  providers: [MailService]
})
export class AppModule {}
