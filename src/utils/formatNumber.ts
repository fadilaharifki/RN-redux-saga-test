export const formatNumber = (
  num: number | string,
  locale: string = 'id-ID',
) => {
  return new Intl.NumberFormat(locale).format(Number(num));
};
