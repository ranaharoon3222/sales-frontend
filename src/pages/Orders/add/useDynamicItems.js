import { useState } from 'react';

const useDynamicItems = () => {
  const [productItems, setProductItems] = useState([
    {
      product: 0,
      quantity: 1,
      label: 'Select Product',
      sale_price: 0,
      discount: 0,
      total_price: 0,
    },
  ]);

  // handle input change
  const handleInputChange = async (e, index) => {
    if (e.target) {
      const { name, value } = e.target;
      const list = [...productItems];
      list[index][name] = Number(value);

      const sale_prcie = Number(list[index].sale_price);
      const discount = (name === 'discount' && value) || list[index].discount;
      const discountValue = (discount / 100) * sale_prcie;
      const quantity = list[index].quantity;
      list[index].total_price = Number(
        ((sale_prcie - discountValue) * quantity).toFixed(2)
      );
      setProductItems(list);
    } else {
      const list = [...productItems];
      list[index].product = e.value;
      list[index].label = e.label;
      const res = await fetch(`http://localhost:1337/products/${e.value}`);
      const data = await res.json();
      list[index].sale_price = data.sale_price;
      list[index].total_price = data.sale_price;
      list[index].quantity = 1;
      list[index].discount = 0;
      setProductItems(list);
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...productItems];
    list.splice(index, 1);
    setProductItems(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (Boolean(productItems[productItems.length - 1].quantity) === false) {
      return alert('Please Enter Quanitity');
    }
    setProductItems([
      ...productItems,
      {
        product: 0,
        quantity: 1,
        label: 'Select Product',
        sale_price: 0,
        discount: 0,
        total_price: 0,
      },
    ]);
  };

  return { productItems, handleAddClick, handleInputChange, handleRemoveClick };
};

export default useDynamicItems;
