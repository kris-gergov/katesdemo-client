import { Box, Grid, SvgIcon, Typography, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import Header from 'app/components/Header';

const NotFound = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Grid
        sx={{
          px: 1,
          [theme.breakpoints.down('sm')]: {
            px: 0.5,
            height: '50%',
          },
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Box p={3}>
            <Header title="" showImportExport={false} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            p={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant="h1" mr={2} textAlign="center">
              404 - Page not found{' '}
            </Typography>
            <SvgIcon fontSize="large" color="primary">
              <SentimentVeryDissatisfiedTwoToneIcon />
            </SvgIcon>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
