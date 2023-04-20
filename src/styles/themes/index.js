import { createTheme } from '@mui/material/styles';

import themeTypography from './typography';
import themePalette from './palette';
import colors from '../scss/_themes-vars.module.scss';
import componentStyleOverrides from './compStyleOverride';

const color = colors;

const themeOption = {
  fontFamily: `'Nunito', sans-serif`,
  colors: color,
  heading: color.grey900,
  paper: color.paper,
  backgroundDefault: color.paper,
  background: color.primaryLight,
  darkTextPrimary: color.grey700,
  darkTextSecondary: color.grey500,
  textDark: color.grey900,
  menuSelected: color.secondaryDark,
  menuSelectedBack: color.secondaryLight,
  divider: color.grey200,
};

const theme = createTheme({
  direction: 'ltr',
  palette: themePalette(themeOption),
  typography: themeTypography(themeOption),
});

theme.components = componentStyleOverrides(themeOption);

export default theme;
