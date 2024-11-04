export const round = (value: number, precision: number) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const calculateDiffRate = (current: number, prev: number) => {
  if (current > 0 && prev > 0 && current === prev) {
    return 100;
  }
  if (prev === 0 || prev == null) {
    return 0;
  }
  const prevValue = current - prev;
  const value = ((current - prevValue) / prevValue) * 100;
  return round(value, 2);
};
