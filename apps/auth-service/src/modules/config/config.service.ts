import { Injectable, Logger } from "@nestjs/common";
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

  private validateEnv(env: Record<string, string>): Record<string, string | number> {
    const configSchema = joi.object({
      PORT: joi.number().default(3000),
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
