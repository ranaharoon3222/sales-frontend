import { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

const useInstallments = ({ item }) => {
  const updateCart = useStoreActions((actions) => actions.Orders.updateCart);

  const [installmentsItem, setInstallmentsItem] = useState([
    {
      invoice: '0',
      status: 'pending',
      price: 0,
    },
  ]);

  // handle input change
  const handleInputChange = async (e, index) => {
    const { name, value } = e.target;
    const list = [...installmentsItem];
    list[index][name] = value;

    setInstallmentsItem(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...installmentsItem];
    list.splice(index, 1);
    setInstallmentsItem(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInstallmentsItem([
      ...installmentsItem,
      {
        invoice: '0',
        status: 'pending',
        price: 0,
      },
    ]);
  };
  useEffect(() => {
    const newInstallment = installmentsItem.filter(
      (ins) => ins.invoice !== '0'
    );
    updateCart({ installments: newInstallment, id: item.id });
  }, [installmentsItem]);

  return {
    installmentsItem,
    handleAddClick,
    handleInputChange,
    handleRemoveClick,
  };
};

export default useInstallments;
