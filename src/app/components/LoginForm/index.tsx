import {
  Box,
  TextField,
  Button,
  FormHelperText,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { UserModel } from 'app/services/authService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/constants';

export interface LoginFormProps {
  onSubmit: (values: UserModel) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const history = useHistory();
  const mobileDevice = useMediaQuery('(max-width:650px)');
  const [error, setError] = useState('');

  const handleSubmit = async (values: UserModel, formikHelpers) => {
    try {
      await onSubmit(values);
      formikHelpers.resetForm();
      formikHelpers.setStatus({ success: true });
      formikHelpers.setSubmitting(false);
      history.push(ROUTES.HOME);
    } catch (err: any) {
      setError('Failed. Please try again.');
      console.log(err.message);
      formikHelpers.setStatus({ success: false });
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: 'test@gmail.com',
        password: 'password123',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Box m={mobileDevice ? 0 : 2}>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              autoFocus
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <Box mt={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </Box>
            {error && (
              <Box mt={3}>
                <FormHelperText error>{error}</FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Alert severity="info">
                <div>
                  Use <b>test@gmail.com</b> and <b>password123</b>
                </div>
              </Alert>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default LoginForm;
