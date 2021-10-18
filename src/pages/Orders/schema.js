import * as yup from 'yup';

export const schema = yup.object().shape({
  order_comp: yup.array().of(
    yup.object().shape({
      discount: yup.number().notRequired(),
      quantity: yup.number(),
      product: yup.number(),
      sale_price: yup.number(),
      unit: yup.string().notRequired().nullable(),
    })
  ),
  client: yup.object().shape({
    value: yup.number(),
  }),
  name: yup.string().required(),
  shipping: yup.number().nullable(),
  // mobile_no: yup.string().required(),
  // guardian_name: yup.string(),
  // prefered_address: yup.string(),
  // occupation: yup.string(),
  // designation: yup.string(),
  // permanent_address: yup.string(),
  // work_place: yup.string(),
  // office_phone: yup.string(),
  // house_occupation: yup
  //   .object()
  //   .shape({
  //     value: yup.string(),
  //   })
  //   .nullable(),
  // monthly_income: yup.string(),
  // age: yup.number().positive(),
  // image: yup
  //   .object()
  //   .shape({
  //     url: yup.string(),
  //   })
  //   .nullable(),
  // cnic_image: yup
  //   .object()
  //   .shape({
  //     url: yup.string(),
  //   })
  //   .nullable(),
  // cnic: yup.string().min(13).max(13).required(),
});
