import {
  Box,
  Card,
  Typography,
  Container,
  styled,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Helmet } from 'react-helmet-async';

import LoginForm from 'app/components/LoginForm';
import { saveTokenAction, saveClaimsAction } from 'app/features/auth/authSlice';
import { LOCAL_STORAGE_TOKEN_KEY } from 'app/constants';
import { loginAxios } from 'app/services/authService';

export type ClaimsType = {
  readonly email: string;
  readonly iat: number;
  readonly exp: number;
  readonly sub: string;
};

export type UserModel = {
  email: string;
  password: string;
};

const MainContent = styled(Box)(
  () => `
    height: 100vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

`,
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  margin-top: 20px;
`,
);

function Login() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onSubmit = async (values: UserModel) => {
    const { data } = await loginAxios(values);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.accessToken);
    const claims: ClaimsType = jwt_decode(data.accessToken);
    dispatch(saveTokenAction(data.accessToken));
    dispatch(saveClaimsAction(claims));
  };

  return (
    <>
      <Helmet>
        <title>Login - Basic</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Card
              sx={{
                mt: 10,
                px: 4,
                pt: 5,
                pb: 3,
                [theme.breakpoints.down('sm')]: {
                  px: 3,
                },
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                  }}
                >
                  Sign in
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                    [theme.breakpoints.down('sm')]: {
                      mb: 2,
                    },
                  }}
                >
                  Fill in the fields below to sign into your account.
                </Typography>
              </Box>

              <LoginForm onSubmit={onSubmit} />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Login;
