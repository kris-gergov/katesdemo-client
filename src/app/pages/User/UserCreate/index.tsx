import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Card, Grid, useTheme } from '@mui/material';
import password from 'secure-random-password';

import Header from 'app/components/Header';
import Form from './Form';
import { CreateUserType } from 'types/user-type';
import { postUserAxios, updateSingleUserAxios } from 'app/services/userService';

interface LocationState {
  user: CreateUserType;
  userId: string;
}

const UserCreate = () => {
  const theme = useTheme();
  const [existingUser, setExistingUser] = useState<CreateUserType | null>(null);
  const [existingUserId, setExistingUserId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const state = location.state as LocationState;
      const { user, userId } = state;
      setExistingUser(user);
      setExistingUserId(userId);
    }
  }, [location]);

  const handleSubmit = async (values: CreateUserType) => {
    if (existingUser && existingUserId) {
      const { email, ...updateValues } = values;
      await updateSingleUserAxios(existingUserId, updateValues);
    } else {
      values.password = password.randomPassword({
        length: 12,
        characters: [
          { characters: password.upper, exactly: 1 },
          { characters: password.symbols, exactly: 1 },
          password.lower,
        ],
      });
      await postUserAxios(values);
    }
  };

  return (
    <>
      <Helmet>
        <title>Users - {existingUser ? 'Edit' : 'Create'}</title>
      </Helmet>
      <Grid
        sx={{
          px: 1,
          [theme.breakpoints.down('sm')]: {
            px: 0.5,
          },
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Header
                title={existingUser ? 'Edit user' : 'Create user'}
                showImportExport={false}
                breadcrumbText={existingUser ? 'Edit user' : 'Create user'}
              />

              <Grid
                sx={{
                  px: 1,
                  [theme.breakpoints.down('sm')]: {
                    px: 0.5,
                  },
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
              >
                <Grid item xs={12}>
                  <Form
                    existingUser={existingUser}
                    existingUserId={existingUserId}
                    submitUser={handleSubmit}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserCreate;
