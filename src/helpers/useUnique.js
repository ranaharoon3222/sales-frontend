export const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}_${Math.random(954344)}`;
};
