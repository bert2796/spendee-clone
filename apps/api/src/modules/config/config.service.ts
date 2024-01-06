import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import joi from 'joi';

config();

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly config: Record<string, string | number>;

  constructor() {
    this.config = this.validateEnv(process.env);
  }

  private validateEnv(
    env: Record<string, string>,
  ): Record<string, string | number> {
    const configSchema = joi.object({
      AUTH_SERVICE_HOST: joi.string().default('0.0.0.0'),
      AUTH_SERVICE_PORT: joi.number().default(3000),
      CATEGORY_SERVICE_HOST: joi.string().default('0.0.0.0'),
      CATEGORY_SERVICE_PORT: joi.number().default(3000),
      PORT: joi.number().default(3000),
      TRANSACTION_SERVICE_HOST: joi.string().default('0.0.0.0'),
      TRANSACTION_SERVICE_PORT: joi.number().default(3000),
      WALLET_SERVICE_HOST: joi.string().default('0.0.0.0'),
      WALLET_SERVICE_PORT: joi.number().default(3000),
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
}
