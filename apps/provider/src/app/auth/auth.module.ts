import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./entity/provider.entity";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Provider]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'provider',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: {wait: false},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
