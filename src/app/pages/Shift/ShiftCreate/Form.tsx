import {
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  CardHeader,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { shiftDefaultValue } from './schema/shiftDefaultValue';
import { yupShiftValidation } from './schema/yupShiftValidation';
import { UserType } from 'types/user-type';
import { CreateShiftType } from 'types/shift-type';
import { ROUTES } from 'app/constants';
import QuillEditor from 'app/components/Quill';

const payment_methods = [
  {
    id: 'bank',
    name: 'Bank',
  },
  {
    id: 'cash',
    name: 'Cash',
  },
];

type Props = {
  className?: string;
  users: UserType[];
  existingShift: CreateShiftType | null;
  existingShiftId: string | null;
  submitShift: (values: CreateShiftType) => void;
};

const Form = ({
  className,
  users,
  existingShift,
  existingShiftId,
  submitShift,
  ...rest
}: Props) => {
  const history = useHistory();
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  let clients: UserType[] = [];
  let cleaners: UserType[] = [];

  users.forEach(user => {
    if (user.type === 'cleaner') {
      cleaners.push(user);
    }
    if (user.type === 'client') {
      clients.push(user);
    }
  });

  return (
    <Formik
      initialValues={existingShift ? existingShift : shiftDefaultValue}
      enableReinitialize
      validationSchema={yupShiftValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          const cleaner = users.find(x => x._id === values.cleaner.id);
          const client = users.find(x => x._id === values.client.id);
          values.cleaner.name = cleaner!.name;
          values.client.name = client!.name;
          values.client.email = client!.email;
          values.client.phone = client!.phone;
          values.client.address = client!.address;

          await submitShift(values);
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar(`Shift ${existingShift ? 'saved' : 'created'}`, {
            variant: 'success',
          });
          history.push(ROUTES.HOME);
        } catch (err: any) {
          alert('Something happened. Please try again.');
          setError(err.message);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {formikProps => (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <form onSubmit={formikProps.handleSubmit} {...rest} role="form">
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Card
                sx={{
                  boxShadow: 'none',
                  [theme.breakpoints.up('sm')]: {
                    pt: 2,
                  },
                  [theme.breakpoints.up('lg')]: {
                    pr: 2,
                  },
                }}
              >
                <CardHeader
                  title="Information"
                  sx={{
                    ml: 2,
                    p: 0,
                    pb: 1,
                    '.MuiCardHeader-title:after': {
                      content: '""',
                      display: 'block',
                      width: '98%',
                      ml: -1,
                      pt: 2,
                      borderBottom: '1px solid lightgrey',
                    },
                  }}
                />

                <CardContent
                  sx={{
                    pl: 0,
                    [theme.breakpoints.down('sm')]: {
                      pr: 0,
                    },
                  }}
                >
                  <Grid container spacing={3} sx={{ py: 1 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.cleaner &&
                            formikProps.errors.cleaner,
                        )}
                        fullWidth
                        helperText={
                          formikProps.touched.cleaner?.id &&
                          formikProps.errors.cleaner?.id
                        }
                        label="Cleaner"
                        name="cleaner"
                        onBlur={formikProps.handleBlur}
                        onChange={e => {
                          formikProps.setFieldValue(
                            'cleaner.id',
                            e.target.value,
                          );
                          if (e.target.value && existingShift)
                            existingShift.cleaner.id = e.target.value;
                        }}
                        value={formikProps.values.cleaner.id}
                        variant="outlined"
                        select
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                      >
                        {formikProps.values.cleaner.id ||
                        existingShift?.cleaner.id ? (
                          ''
                        ) : (
                          <option>Select...</option>
                        )}
                        {cleaners.map(cleaner => (
                          <option
                            key={cleaner._id}
                            value={cleaner._id}
                            selected={existingShift?.cleaner.id === cleaner._id}
                          >
                            {cleaner.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.client &&
                            formikProps.errors.client,
                        )}
                        fullWidth
                        helperText={
                          formikProps.touched.client?.id &&
                          formikProps.errors.client?.id
                        }
                        label="Client"
                        name="client"
                        onBlur={formikProps.handleBlur}
                        onChange={e => {
                          formikProps.setFieldValue(
                            'client.id',
                            e.target.value,
                          );
                          if (e.target.value && existingShift)
                            existingShift.client.id = e.target.value;
                        }}
                        value={formikProps.values.client.id}
                        variant="outlined"
                        select
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                      >
                        {formikProps.values.client.id ||
                        existingShift?.client.id ? (
                          ''
                        ) : (
                          <option>Select...</option>
                        )}
                        {clients.map(client => (
                          <option
                            key={client._id}
                            value={client._id}
                            selected={existingShift?.client.id === client._id}
                          >
                            {client.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ pt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.hours && formikProps.errors.hours,
                        )}
                        helperText={
                          formikProps.touched.hours && formikProps.errors.hours
                        }
                        fullWidth
                        label="Hours"
                        name="hours"
                        type="number"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.hours}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DateTimePicker
                        value={
                          existingShift
                            ? existingShift.date
                            : formikProps.values.date
                        }
                        onChange={date => {
                          formikProps.setFieldValue('date', date);
                          if (date && existingShift) existingShift.date = date;
                        }}
                        label={'Shift date'}
                        inputFormat="DD/MM/yyyy HH:mm"
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            name="date"
                            error={Boolean(
                              formikProps.touched.date &&
                                formikProps.errors.date,
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={2} mb={0.5}>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      ml={1}
                    >
                      Notes
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      value={formikProps.values.notes}
                      onChange={(value: string) =>
                        formikProps.setFieldValue('notes', value)
                      }
                    />
                  </Paper>
                  {formikProps.touched.notes && formikProps.errors.notes && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {formikProps.errors.notes}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Card
                sx={{
                  boxShadow: 'none',
                  [theme.breakpoints.up('sm')]: {
                    pt: 2,
                  },
                }}
              >
                <CardHeader
                  title="Payment"
                  sx={{
                    ml: 2,
                    p: 0,
                    pb: 1,
                    '.MuiCardHeader-title:after': {
                      content: '""',
                      display: 'block',
                      width: '98%',
                      ml: -1,
                      pt: 2,
                      borderBottom: '1px solid lightgrey',
                    },
                  }}
                />
                <CardContent
                  sx={{
                    pl: 0,
                    [theme.breakpoints.down('sm')]: {
                      pr: 0,
                      pb: '4px !important',
                    },
                  }}
                >
                  <Grid container spacing={3} sx={{ py: 1 }}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Payment method"
                        name="paymentMethod"
                        onChange={formikProps.handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={formikProps.values.paymentMethod}
                        variant="outlined"
                        fullWidth
                      >
                        {payment_methods.map(method => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.amount &&
                            formikProps.errors.amount,
                        )}
                        helperText={
                          formikProps.touched.amount &&
                          formikProps.errors.amount
                        }
                        label="Amount (£)"
                        name="amount"
                        type="number"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.amount}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.commission &&
                            formikProps.errors.commission,
                        )}
                        helperText={
                          formikProps.touched.commission &&
                          formikProps.errors.commission
                        }
                        label="Commission (£)"
                        name="commission"
                        type="number"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.commission}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Box mt={2} sx={{ alignItems: 'center' }}>
                    <DateTimePicker
                      value={
                        existingShift
                          ? existingShift.paymentDate
                          : formikProps.values.paymentDate
                      }
                      onChange={date => {
                        formikProps.setFieldValue('paymentDate', date);
                        if (date && existingShift)
                          existingShift.paymentDate = date;
                      }}
                      label={'Payment date'}
                      inputFormat="DD/MM/yyyy HH:mm"
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant="outlined"
                          name="paymentDate"
                          error={Boolean(
                            formikProps.touched.paymentDate &&
                              formikProps.errors.paymentDate,
                          )}
                          sx={{ mr: 3 }}
                        />
                      )}
                    />
                    <FormControlLabel
                      sx={{
                        [theme.breakpoints.down('sm')]: {
                          pt: 1,
                          pl: 0.5,
                        },
                      }}
                      control={
                        <Checkbox
                          checked={formikProps.values.paid}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.paid}
                          name="paid"
                          sx={{
                            '& .MuiFormControlLabel-label': { mt: '5px' },
                          }}
                        />
                      }
                      label="Shift is paid"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              {existingShift ? 'Save' : 'Create'} shift
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
