import { Injectable, Logger } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from 'dotenv';
import joi from 'joi';

import { CategoryEntity } from '../category/category.entity';

config();

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly config: Record<string, string | number>;

  constructor() {
    this.config = this.validateEnv(process.env);
  }

  private validateEnv(env: Record<string, string>): Record<string, string | number> {
    const configSchema = joi.object({
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      // GENERAL
      PORT: joi.number().default(3000),

      // DB
      PG_HOST: joi.string().required(),
      PG_PORT: joi.number().required(),
      PG_DATABASE: joi.string().required(),
      PG_USERNAME: joi.string().required(),
      PG_PASSWORD: joi.string().required(),

      /* eslint-enable sort-keys-fix/sort-keys-fix */
    });

    const { error, value } = configSchema.validate(env, { allowUnknown: true });
    if (error) {
      this.logger.error(`Config validation error: ${error.message}`);

      process.exit(1);
    }

    return value;
  }

  get<T>(key: string): T {
    return this.config[key] as T;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      type: 'postgres',
      host: this.get<string>('PG_HOST'),
      port: this.get<number>('PG_PORT'),
      database: this.get<string>('PG_DATABASE'),
      username: this.get<string>('PG_USERNAME'),
      password: this.get<string>('PG_PASSWORD'),

      entities: [CategoryEntity],
      migrations: ['src/database/migrations/*.ts'],
      /* eslint-enable sort-keys-fix/sort-keys-fix */
    }
  }
}
