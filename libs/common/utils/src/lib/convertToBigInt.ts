export const convertToBigInt = (
  price: string | number,
  decimal = 2,
): bigint => {
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + decimal + '})?', 'g');
  const priceStr = (
    typeof price === 'number' || typeof price.toString === 'function'
      ? price.toString()
      : price
  ) as string;
  const truncatedPriceStr = (priceStr.match(reg) as RegExpMatchArray)[0];
  const dot = truncatedPriceStr.indexOf('.');

  let priceWithDecimal;
  if (dot === -1) {
    priceWithDecimal = `${truncatedPriceStr}.${'0'.repeat(decimal)}`;
  } else {
    const computedPrice = decimal - (truncatedPriceStr.length - dot) + 1;
    priceWithDecimal =
      computedPrice > 0
        ? `${truncatedPriceStr}${'0'.repeat(decimal)}`
        : truncatedPriceStr;
  }

  return BigInt(priceWithDecimal.replace('.', ''));
};
