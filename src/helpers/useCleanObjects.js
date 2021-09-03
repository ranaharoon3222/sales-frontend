export const useCleanObjects = () => {
  const cleanObjects = (obj, removeZero) => {
    for (var propName in obj) {
      if (
        obj[propName] === '' ||
        obj[propName] === undefined ||
        (removeZero && obj[propName] === 0)
      ) {
        delete obj[propName];
      }
    }
    return obj;
  };

  return { cleanObjects };
};
