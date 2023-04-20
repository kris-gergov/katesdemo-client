import { PaymentMethod } from 'types/shift-type';
import * as Yup from 'yup';

export const yupShiftValidation = Yup.object().shape({
  client: Yup.object({
    id: Yup.string().required('Client is required'),
  }),
  cleaner: Yup.object({
    id: Yup.string().required('Cleaner is required'),
  }),
  date: Yup.date().required('Date is required'),
  hours: Yup.number().min(0),
  amount: Yup.number().min(0),
  paid: Yup.boolean().optional(),
  paymentDate: Yup.date().nullable(),
  paymentMethod: Yup.mixed<PaymentMethod>().oneOf(['bank', 'cash']),
  commission: Yup.number(),
  notes: Yup.string().optional(),
});
