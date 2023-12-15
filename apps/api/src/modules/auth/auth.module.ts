import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('AUTH_SERVICE_HOST'),
            port: configService.get<number>('AUTH_SERVICE_PORT'),
          },
          transport: Transport.TCP
        }),
      },
    ]),
  ]
})
export class AuthModule {}
