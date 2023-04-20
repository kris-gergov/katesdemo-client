import { useEffect, useState } from 'react';
import { Card, Grid, Typography, useTheme } from '@mui/material';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';

import { deleteShiftAxios, getShiftAxios } from 'app/services/shiftService';
import { ShiftType } from 'types/shift-type';
import Header from 'app/components/Header';
import Results from './Results';

const ShiftList = () => {
  const [shifts, setShifts] = useState<ShiftType[]>([]);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const { data } = await getShiftAxios();
        setShifts(data.shifts);
      } catch (e) {}
      handleClose();
    };
    fetchShifts();
  }, []);

  const handleDelete = async (selectedShifts: string[]) => {
    try {
      if (selectedShifts.length === 1) {
        await deleteShiftAxios(selectedShifts[0]);
        setShifts(shifts =>
          shifts.filter((shift, index) => shift._id !== selectedShifts[0]),
        );
        enqueueSnackbar(`Shift deleted`, {
          variant: 'success',
        });
      } else {
        const unresolved = selectedShifts.map(async shift => {
          await deleteShiftAxios(shift);
        });
        await Promise.all(unresolved);
        setShifts(shifts.filter(shift => !selectedShifts.includes(shift._id)));
        enqueueSnackbar(`Shifts deleted`, {
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
        <title>Shift list</title>
      </Helmet>
      <Grid>
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Header
                title="Shift list"
                showImportExport
                createButtonText="New shift"
                createButtonLink="/create-shift"
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
                  {shifts && shifts.length ? (
                    <Box>
                      <Results shifts={shifts} deleteShift={handleDelete} />
                    </Box>
                  ) : (
                    <Box my={4}>
                      <Typography variant="h3" textAlign="center">
                        No shifts found
                      </Typography>
                    </Box>
                  )}
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
export default ShiftList;
