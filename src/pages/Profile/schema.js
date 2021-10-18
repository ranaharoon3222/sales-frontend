import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string(),
  mobile: yup.string(),
  remarks: yup.string(),
});
