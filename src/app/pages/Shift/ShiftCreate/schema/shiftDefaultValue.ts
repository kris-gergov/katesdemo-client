import { CreateShiftType } from 'types/shift-type';

export const shiftDefaultValue: CreateShiftType = {
  client: {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postcode: '',
    },
  },
  cleaner: {
    id: '',
    name: '',
  },
  date: '',
  hours: 0,
  amount: 0,
  paid: false,
  paymentDate: null,
  paymentMethod: 'cash',
  commission: 0,
  notes: '',
};
