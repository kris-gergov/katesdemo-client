import { Box, Card, Grid, useTheme } from '@mui/material';
import Header from 'app/components/Header';
import Form from './Form';
import { Helmet } from 'react-helmet-async';
import { getUsersAxios } from 'app/services/userService';
import { useState, useEffect } from 'react';
import { UserType } from 'types/user-type';
import Results from './Results';
import { CreateSummaryType, SummaryType } from 'types/shift-type';
import { postShiftSummaryAxios } from 'app/services/shiftService';

const Summary = () => {
  const theme = useTheme();
  const [summaryResults, setSummaryResults] = useState<SummaryType | null>(
    null,
  );

  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsersAxios();
        setAllUsers(data.users);
      } catch (e) {
        alert('Something is wrong.');
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (values: CreateSummaryType) => {
    const { data } = await postShiftSummaryAxios(values);
    setSummaryResults(data.summary);
    return data.summary;
  };

  return (
    <>
      <Helmet>
        <title>Shifts - Create</title>
      </Helmet>
      <Grid
        sx={{
          px: 1,
          [theme.breakpoints.down('sm')]: {
            px: 0.5,
            height: '100%',
          },
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Card
            sx={{
              [theme.breakpoints.down('sm')]: {
                height: '100%',
              },
            }}
          >
            <Box p={3}>
              <Header
                title="Summary"
                showImportExport={false}
                breadcrumbText="Summary"
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
                  <Form users={allUsers} submitSummary={handleSubmit} />
                </Grid>
                <Grid item xs={12}>
                  {summaryResults ? <Results data={summaryResults} /> : ''}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Summary;
