const formattedNumber = (count: number): string => {
  const formattedNumber = new Intl.NumberFormat('ru-RU').format(count);

  return `${formattedNumber} Р`;
};
  
export { formattedNumber };
  