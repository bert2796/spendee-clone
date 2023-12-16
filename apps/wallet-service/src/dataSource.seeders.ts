import { DataSourceOptions } from 'typeorm';

import { ConfigService  } from './modules/config/config.service';

const configService = new ConfigService();
const dataSourceOptions = configService.getTypeOrmConfig() as unknown as DataSourceOptions;

export default {
  ...dataSourceOptions,

  seeds: ["src/database/seeds/**/*{.ts,.js}"],
}
