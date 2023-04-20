import { Breadcrumbs, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import StyledBreadcrumb from 'app/components/StyledBreadcrumb';

const Header = () => {
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb label="Account" />
      </Breadcrumbs>
      <Typography variant="h4" color="textPrimary" mt={3}>
        Settings
      </Typography>
    </div>
  );
};

export default Header;
