export const useCleanObjects = () => {
  const cleanObjects = (obj, removeZero) => {
    for (var propName in obj) {
      if (
        obj[propName] === '' ||
        obj[propName] === undefined ||
        obj[propName] === null ||
        obj[propName].length === 0 ||
        (removeZero && obj[propName] === 0)
      ) {
        delete obj[propName];
      }
    }
    return obj;
  };

  return { cleanObjects };
};
