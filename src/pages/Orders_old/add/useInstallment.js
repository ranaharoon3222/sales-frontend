import { useState } from 'react';

const useDynamicItems = () => {
  const [installmentsItem, setInstallmentsItem] = useState([
    {
      invoice: '0',
      status: 'pending',
      price: 0,
    },
  ]);

  // handle input change
  const InhandleInputChange = async (e, index) => {
    const { name, value } = e.target;
    const list = [...installmentsItem];
    list[index][name] = value;

    setInstallmentsItem(list);
  };

  // handle click event of the Remove button
  const InhandleRemoveClick = (index) => {
    const list = [...installmentsItem];
    list.splice(index, 1);
    setInstallmentsItem(list);
  };

  // handle click event of the Add button
  const InhandleAddClick = () => {
    setInstallmentsItem([
      ...installmentsItem,
      {
        invoice: '0',
        status: 'pending',
        price: 0,
      },
    ]);
  };

  return {
    installmentsItem,
    InhandleAddClick,
    InhandleInputChange,
    InhandleRemoveClick,
  };
};

export default useDynamicItems;
