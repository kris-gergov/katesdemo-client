import { Helmet } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import ThemeProviderWrapper from 'styles/themes/ThemeProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Routes from './routes';
import './index.css';

const App = () => {
  return (
    <>
      <ThemeProviderWrapper>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <SnackbarProvider
            dense
            autoHideDuration={2500}
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            preventDuplicate
          >
            <Helmet
              titleTemplate="%s - Kate's cleaning services"
              defaultTitle="Kate's cleaning services"
            >
              <meta name="description" content="Kate's cleaning services" />
            </Helmet>

            <Routes />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProviderWrapper>
    </>
  );
};

export default App;
