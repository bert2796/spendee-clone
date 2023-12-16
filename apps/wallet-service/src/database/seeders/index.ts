import { currencies } from 'currencies.json';

import DataSource from '../../dataSource';
import { CurrencyEntity } from '../../modules/currency/currency.entity';

(async () => {
  const dataSource = await DataSource.initialize();

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(CurrencyEntity)
    .values(
      currencies.map(currency => ({
        code: currency.code,
        name: currency.name,
        symbol: currency.symbolNative,
      })),
    )
    .execute();

  await dataSource.destroy();

  process.exit(0);
})();


