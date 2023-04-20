import { CreateUserType } from 'types/user-type';

export const userDefaultValue: CreateUserType = {
  email: '',
  password: '',
  name: '',
  type: 'cleaner',
  address: {
    street: '',
    city: '',
    postcode: '',
  },
  deposit: 0,
  phone: 0,
};
