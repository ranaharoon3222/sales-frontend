export const useArrayValues = ({ appiId, apiData }) => {
  let arrayValues = [];

  apiData?.[appiId]?.forEach((item) => {
    return arrayValues.push({
      value: item.id,
      label: `${item.name}-${item.mobile_no}`,
    });
  });

  return { arrayValues };
};
