import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { GreyGooseTheme } from './customTheme';

const ThemeProviderWrapper = function (props) {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={GreyGooseTheme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
