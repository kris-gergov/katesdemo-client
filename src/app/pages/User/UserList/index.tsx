import { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { Backdrop, Box, CircularProgress, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';

import { deleteUserAxios, getUsersAxios } from 'app/services/userService';
import { UserType } from 'types/user-type';
import Header from 'app/components/Header';
import Results from './Results';

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [open, setOpen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsersAxios();
        setUsers(data.users);
      } catch (e) {
        alert('Something is wrong.');
      }
      handleClose();
    };
    fetchUsers();
  }, []);

  const handleDelete = async (selectedUsers: string[]) => {
    try {
      if (selectedUsers.length === 1) {
        await deleteUserAxios(selectedUsers[0]);
        setUsers(users =>
          users.filter((user, index) => user._id !== selectedUsers[0]),
        );
        enqueueSnackbar(`User deleted`, {
          variant: 'success',
        });
      } else {
        const unresolved = selectedUsers.map(async user => {
          await deleteUserAxios(user);
        });
        await Promise.all(unresolved);

        setUsers(users.filter(user => !selectedUsers.includes(user._id)));
        enqueueSnackbar(`Users deleted`, {
          variant: 'success',
        });
      }
    } catch (err: any) {
      enqueueSnackbar('Something happened. Please try again.', {
        variant: 'warning',
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>User list</title>
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
                title="User list"
                showImportExport
                createButtonText="New user"
                createButtonLink="/create-user"
                breadcrumbText="Users"
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
                <Grid
                  item
                  xs={12}
                  sx={{
                    [theme.breakpoints.down('sm')]: { pl: '26px !important' },
                  }}
                >
                  {users && users.length ? (
                    <Box mt={1}>
                      <Results users={users} deleteUser={handleDelete} />
                    </Box>
                  ) : (
                    <Box my={4}>
                      <Typography variant="h3" textAlign="center">
                        No users found
                      </Typography>
                    </Box>
                  )}
                  <Backdrop
                    sx={{
                      zIndex: theme.zIndex.drawer + 1,
                      color: theme.palette.primary.main,
                    }}
                    open={open}
                    onClick={handleClose}
                  >
                    <CircularProgress color="inherit" data-testid="spinner" />
                  </Backdrop>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default UserList;
