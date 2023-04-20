import {
  Box,
  Card,
  CardContent,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Chart from 'react-apexcharts';

import Page from '../../layouts/page-layout';

const Home = () => {
  const theme = useTheme();

  const mobileDevice = useMediaQuery('(max-width:650px)');

  const getChartStyling = (theme: Theme) => ({
    chart: {
      background: theme.palette.background.paper,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.dark, theme.palette.secondary.main],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: true,
      labels: {
        colors: theme.palette.text.secondary,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider,
      },
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  });

  return (
    <Page style={{ minHeight: '100%' }} title="Dashboard">
      <Typography variant={mobileDevice ? 'h4' : 'h3'} color="textPrimary">
        Dashboard
      </Typography>
      <Box my={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ height: mobileDevice ? '300px' : '400px' }}>
                <Typography variant="h5" color="textPrimary">
                  Sales
                </Typography>
                {/*    <Chart
                  options={getChartStyling(theme)}
                  series={sales}
                  type="bar"
                  height={'100%'}
                /> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default Home;
