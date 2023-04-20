import {
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  FormHelperText,
  CardHeader,
  Button,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userDefaultValue } from './schema/userDefaultValue';
import { yupUserValidation } from './schema/yupUserValidation';
import { useSnackbar } from 'notistack';
import { CreateUserType } from 'types/user-type';
import { ROUTES } from 'app/constants';

const user_types = [
  {
    id: 'client',
    name: 'Client',
  },
  {
    id: 'cleaner',
    name: 'Cleaner',
  },
];

type Props = {
  className?: string;
  existingUser: CreateUserType | null;
  existingUserId: string | null;
  submitUser: (values: CreateUserType) => Promise<void>;
};

const Form = ({
  className,
  existingUser,
  existingUserId,
  submitUser,
  ...rest
}: Props) => {
  const history = useHistory();
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  return (
    <Formik
      initialValues={existingUser ? existingUser : userDefaultValue}
      enableReinitialize
      validationSchema={yupUserValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          await submitUser(values);
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar(`User ${existingUser ? 'saved' : 'created'}`, {
            variant: 'success',
          });
          history.push(ROUTES.USERS);
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
                          formikProps.touched.email && formikProps.errors.email,
                        )}
                        helperText={
                          formikProps.touched.email && formikProps.errors.email
                        }
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.email}
                        variant="outlined"
                        disabled={!!existingUser}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.name && formikProps.errors.name,
                        )}
                        helperText={
                          formikProps.touched.name && formikProps.errors.name
                        }
                        fullWidth
                        label="Name"
                        name="name"
                        type="text"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.name}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ pt: 2 }}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Type"
                        name="type"
                        onChange={formikProps.handleChange}
                        select
                        SelectProps={{ native: true }}
                        value={formikProps.values.type}
                        variant="outlined"
                        fullWidth
                      >
                        {user_types.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.phone && formikProps.errors.phone,
                        )}
                        helperText={
                          formikProps.touched.phone && formikProps.errors.phone
                        }
                        fullWidth
                        label="Phone"
                        name="phone"
                        type="tel"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.phone}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.deposit &&
                            formikProps.errors.deposit,
                        )}
                        helperText={
                          formikProps.touched.deposit &&
                          formikProps.errors.deposit
                        }
                        fullWidth
                        label="Deposit (£)"
                        name="deposit"
                        type="number"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.deposit}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
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
                  title="Address"
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
                        error={Boolean(
                          formikProps.touched.address?.city &&
                            formikProps.errors.address?.city,
                        )}
                        helperText={
                          formikProps.touched.address?.city &&
                          formikProps.errors.address?.city
                        }
                        label="City"
                        name="address.city"
                        type="text"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.address?.city}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.address?.street &&
                            formikProps.errors.address?.street,
                        )}
                        helperText={
                          formikProps.touched.address?.street &&
                          formikProps.errors.address?.street
                        }
                        label="Street"
                        name="address.street"
                        type="text"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.address?.street}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        error={Boolean(
                          formikProps.touched.address?.postcode &&
                            formikProps.errors.address?.postcode,
                        )}
                        helperText={
                          formikProps.touched.address?.postcode &&
                          formikProps.errors.address?.postcode
                        }
                        label="Post code"
                        name="address.postcode"
                        type="text"
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        value={formikProps.values.address?.postcode}
                        variant="outlined"
                        fullWidth
                      />
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
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              {existingUser ? 'Save' : 'Create'} user
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
