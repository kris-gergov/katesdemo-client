import * as Yup from 'yup';

type UserType = 'cleaner' | 'client';

const phoneRegExp = /^[0-9]{6,12}$/;

export const yupUserValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().min(3).required('Name is required'),
  type: Yup.mixed<UserType>().oneOf(['cleaner', 'client']),
  address: Yup.object({
    city: Yup.string().required('City is required'),
    street: Yup.string().required('Street is required'),
    postcode: Yup.string().required('Post code is required'),
  }),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  deposit: Yup.number().optional(),
});
