export const useCleanObjects = (tobjopobj) => {
  const cleanObjects = (obj) => {
    for (var propName in obj) {
      if (obj[propName] === '' || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  };

  return { cleanObjects };
};
