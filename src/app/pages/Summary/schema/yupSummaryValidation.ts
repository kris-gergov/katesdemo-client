import * as Yup from 'yup';

export const yupSummaryValidation = Yup.object().shape({
  client: Yup.string().required('Client is required'),
  cleaner: Yup.string().required('Cleaner is required'),
  from: Yup.date().required('From date is required'),
  to: Yup.date().required('To date is required'),
});
