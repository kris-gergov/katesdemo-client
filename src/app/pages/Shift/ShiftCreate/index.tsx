import {
  Backdrop,
  Box,
  Card,
  Grid,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { getUsersAxios } from 'app/services/userService';
import { UserType } from 'types/user-type';
import { CreateShiftType } from 'types/shift-type';
import { updateShiftAxios, postShiftAxios } from 'app/services/shiftService';
import Header from 'app/components/Header';
import Form from './Form';

interface LocationState {
  shift: CreateShiftType;
  shiftId: string;
}

const ShiftCreate = () => {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [existingShift, setExistingShift] = useState<CreateShiftType | null>(
    null,
  );
  const [existingShiftId, setExistingShiftId] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    if (location.state) {
      const state = location.state as LocationState;
      const { shift, shiftId } = state;
      setExistingShift(shift);
      setExistingShiftId(shiftId);
    }
  }, [location]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsersAxios();
        setAllUsers(data.users);
      } catch (e) {
        alert('Something is wrong.');
      }
      handleClose();
    };
    fetchUsers();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: CreateShiftType) => {
    if (existingShift && existingShiftId) {
      await updateShiftAxios(existingShiftId, values);
    } else {
      await postShiftAxios(values);
    }
  };

  return (
    <>
      <Helmet>
        <title>Shifts - {existingShift ? 'Edit' : 'Create'}</title>
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
                title={existingShift ? 'Edit shift' : 'Create shift'}
                showImportExport={false}
                breadcrumbText={existingShift ? 'Edit shift' : 'Create shift'}
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
                    users={allUsers}
                    existingShift={existingShift}
                    existingShiftId={existingShiftId}
                    submitShift={handleSubmit}
                  />
                  <Backdrop open={open} onClick={handleClose}>
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

export default ShiftCreate;
