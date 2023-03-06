import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, WinstonMiddleware } from 'hcp-bpcp-module-common';
import { TestModule } from './api/v1/test/test.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        'config/' +
        (process.env.NODE_ENV === 'prd'
          ? '.prd.env'
          : process.env.NODE_ENV === 'stg'
          ? '.stg.env'
          : process.env.NODE_ENV === 'dev'
          ? '.dev.env'
          : '.local.env'),
      isGlobal: true,
    }),
    LoggerModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WinstonMiddleware).forRoutes('*');
  }
}
