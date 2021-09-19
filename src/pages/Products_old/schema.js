import * as yup from 'yup';

export const schema = yup.object().shape({
  product_name: yup.string().required(),
  item_code: yup.string(),
  sale_price: yup.number(),
  model_no: yup.string(),
  unit: yup
    .object()
    .shape({
      value: yup.string(),
    })
    .typeError('Please Select One Value'),
  opening_stock: yup.number().integer(),
  purchase_price: yup.number().required(),
  brand: yup
    .object()
    .shape({
      value: yup.number(),
    })
    .typeError('Please Select One Brand'),
  print_name: yup.string(),
  stock: yup.number(),
});
