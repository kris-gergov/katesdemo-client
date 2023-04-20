import {
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import MenuIcon from '@mui/icons-material/Menu';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import StyledBreadcrumb from 'app/components/StyledBreadcrumb';
import { SidebarContext } from 'app/contexts/SidebarContext';
import { useContext } from 'react';

type Props = {
  className?: string;
  title: string;
  createButtonText?: string;
  createButtonLink?: string;
  breadcrumbText?: string;
  showImportExport: boolean;
};

const Header = ({
  className,
  title,
  createButtonLink,
  createButtonText,
  breadcrumbText,
  showImportExport,
  ...rest
}: Props) => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'space-between', flexDirection: 'column', mb: 3 }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          /*  [theme.breakpoints.down('sm')]: {
            '.MuiGrid-root > .MuiGrid-item': {
              pl: 20,
            },
          }, */
        }}
      >
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
          {breadcrumbText ? <StyledBreadcrumb label={breadcrumbText} /> : ''}
        </Breadcrumbs>
        {mobileDevice && !sidebarToggle ? (
          <IconButton
            sx={{ ml: 0 }}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        ) : (
          ''
        )}
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" color="textPrimary" ml={1}>
          {title}
        </Typography>
        {createButtonLink && createButtonText ? (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to={createButtonLink}
            startIcon={
              <SvgIcon fontSize="small">
                <PlusCircleIcon />
              </SvgIcon>
            }
          >
            {createButtonText}
          </Button>
        ) : (
          ''
        )}

        {/* {showImportExport ? (
          <Box
            sx={{
              [theme.breakpoints.down('xs')]: {
                width: '35%',
              },
            }}
          >
            <Button
              sx={{
                mb: theme.spacing(1),
                '& + &': {
                  ml: theme.spacing(1),
                },
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <UploadIcon />
                </SvgIcon>
              }
            >
              Import
            </Button>
            <Button
              sx={{
                mb: theme.spacing(1),
                '& + &': {
                  ml: theme.spacing(1),
                },
                [theme.breakpoints.down('sm')]: {
                  ml: 0,
                },
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <DownloadIcon />
                </SvgIcon>
              }
            >
              Export
            </Button>
          </Box>
        ) : (
          ''
        )} */}
      </Grid>
    </Grid>
  );
};

export default Header;
