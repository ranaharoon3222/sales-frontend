export const useCheckData = ({ apiData }) => {
  const checkData = (name) => {
    return apiData?.[name] || '';
  };
  return { checkData };
};
