export const formatNumber = (
  num: number | string,
  locale: string = 'id-ID',
) => {
  if (!num) {
    return num;
  }
  const numStr =
    typeof num === 'string' ? num.replace(/[^\d]/g, '') : String(num);
  return new Intl.NumberFormat(locale).format(Number(numStr));
};
