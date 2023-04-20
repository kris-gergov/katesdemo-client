import {
  Grid,
  Breadcrumbs,
  Typography,
  Button,
  SvgIcon,
  useTheme,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/constants';
import StyledBreadcrumb from 'app/components/StyledBreadcrumb';

type Props = {
  className?: string;
  onAddClick?: () => void;
};

const Header = ({ className, onAddClick, ...rest }: Props) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Grid container justifyContent="space-between" spacing={3} {...rest}>
      <Grid item>
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
          <StyledBreadcrumb label="Calendar" />
        </Breadcrumbs>
        <Typography variant="h2" color="textPrimary" pt={3}>
          Here's what you planned
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push(ROUTES.CREATE_SHIFT)}
          sx={{
            marginBottom: theme.spacing(1),
            '& + &': {
              marginLeft: theme.spacing(1),
            },
          }}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Shift
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
