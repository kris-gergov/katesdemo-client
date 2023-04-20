import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Formik } from 'formik';

import { summaryDefaultValue } from './schema/summaryDefaultValue';
import { yupSummaryValidation } from './schema/yupSummaryValidation';
import { addMonths } from 'utils/date';

type UserType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  type: string;
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  deposit: number;
  phone: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type CreateSummaryType = {
  client: string;
  cleaner: string;
  from: Date | string;
  to: Date | string;
};

type SummaryType = {
  num: number;
  commission: number;
  range: string;
  outstanding: number;
  amount: number;
};

type SummaryProps = {
  users: UserType[];
  submitSummary: (values: CreateSummaryType) => Promise<SummaryType>;
};

const Form = ({ users, submitSummary }: SummaryProps) => {
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
      initialValues={summaryDefaultValue}
      validationSchema={yupSummaryValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          const summary = await submitSummary(values);
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          if (!summary) {
            enqueueSnackbar(`No shifts found that match that criteria`, {
              variant: 'warning',
            });
          } else {
            enqueueSnackbar(`Summary ran successfully`, {
              variant: 'success',
            });
          }
        } catch (err: any) {
          alert('Something happened. Please try again.');
          setError(err.message);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
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
                  <Grid container spacing={3} sx={{ pt: 2, pb: 1 }}>
                    <Grid item xs={12} md={6} lg={3}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.cleaner &&
                            formikProps.errors.cleaner,
                        )}
                        fullWidth
                        helperText={
                          formikProps.touched.cleaner &&
                          formikProps.errors.cleaner
                        }
                        label="Cleaner"
                        name="cleaner"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.cleaner}
                        variant="outlined"
                        select
                        SelectProps={{
                          native: true,
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          'data-testid': 'summary-cleaner-dropdown',
                        }}
                      >
                        {formikProps.values.cleaner ? (
                          ''
                        ) : (
                          <option>Select...</option>
                        )}
                        {cleaners.map(cleaner => (
                          <option key={cleaner._id} value={cleaner._id}>
                            {cleaner.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.client &&
                            formikProps.errors.client,
                        )}
                        fullWidth
                        helperText={
                          formikProps.touched.client &&
                          formikProps.errors.client
                        }
                        label="Client"
                        name="client"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.client}
                        variant="outlined"
                        select
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          'data-testid': 'summary-client-dropdown',
                        }}
                      >
                        {formikProps.values.client ? (
                          ''
                        ) : (
                          <option>Select...</option>
                        )}
                        {clients.map(client => (
                          <option key={client._id} value={client._id}>
                            {client.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                      <DateTimePicker
                        value={formikProps.values.from}
                        onChange={date =>
                          formikProps.setFieldValue('from', date)
                        }
                        label={'From date'}
                        inputFormat="DD/MM/yyyy HH:mm"
                        ampm={false}
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            name="from"
                            error={Boolean(
                              formikProps.touched.from &&
                                formikProps.errors.from,
                            )}
                            value={formikProps.values.from}
                            onChange={e =>
                              formikProps.setFieldValue('from', e.target.value)
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <DateTimePicker
                        value={formikProps.values.to}
                        onChange={date => formikProps.setFieldValue('to', date)}
                        label={'To date'}
                        inputFormat="DD/MM/yyyy HH:mm"
                        ampm={false}
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            name="to"
                            error={Boolean(
                              formikProps.touched.to && formikProps.errors.to,
                            )}
                            value={formikProps.values.to}
                            onChange={e =>
                              formikProps.setFieldValue('to', e.target.value)
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    justifyContent="flex-end"
                    sx={{
                      pt: 1,
                      [theme.breakpoints.down('sm')]: {
                        justifyContent: 'center',
                      },
                    }}
                  >
                    <Grid item>
                      <Button
                        variant="outlined"
                        sx={{ p: '4px 10px' }}
                        onClick={() => {
                          formikProps.setFieldValue('to', addMonths(0));
                          formikProps.setFieldValue('from', addMonths(-1));
                        }}
                      >
                        Last month
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        sx={{ p: '4px 10px' }}
                        onClick={() => {
                          formikProps.setFieldValue('to', addMonths(0));
                          formikProps.setFieldValue('from', addMonths(-3));
                        }}
                      >
                        Last 3 months
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        sx={{ p: '4px 10px' }}
                        onClick={() => {
                          formikProps.setFieldValue('to', addMonths(0));
                          formikProps.setFieldValue('from', addMonths(-12));
                        }}
                      >
                        Last year
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  width: '95%',
                  mx: 'auto',
                },
                mr: 3,
                px: 4,
              }}
            >
              Run
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
