import { useCheckData } from '../../helpers/useCheckData';

export const AllFields = ({ apiData }) => {
  const { checkData } = useCheckData({ apiData });

  const productFields = [
    {
      name: 'name',
      defaultValue: checkData('name'),
    },
    {
      name: 'description',
      defaultValue: checkData('description'),
    },
  ];

  return { productFields };
};
