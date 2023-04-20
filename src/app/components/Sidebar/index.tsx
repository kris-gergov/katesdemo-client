import { useContext } from 'react';
import { Box, Card, IconButton, styled, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarMenu from './SidebarMenu';
import { SidebarContext } from 'app/contexts/SidebarContext';

const drawerWidth = 220;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down('sm')]: {
    width: 100,
  },
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(11)} + 1px)`,
  [theme.breakpoints.down('sm')]: {
    width: 0,
  },
});

interface SidebarDrawerCardProps {
  open: boolean;
}

const SidebarWrapper = styled(Card, {
  shouldForwardProp: prop => prop !== 'open',
})<SidebarDrawerCardProps>(({ theme, open }) => ({
  width: theme.sidebar.width,
  background: theme.sidebar.background,
  margin: 0,
  overflow: 'inherit',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(4, 0, 4, 4),
  },
  [theme.breakpoints.up('sm')]: {
    position: 'fixed',
    height: '92%',
    margin: theme.spacing(4, 0, 2, 2),
    zIndex: 10,
    borderRadius: theme.general.borderRadius,
  },
}));

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 80px;
        align-items: center;
        margin: 0 ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`,
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <>
      <SidebarWrapper open={sidebarToggle}>
        <TopSection sx={{ justifyContent: 'center' }}>
          <>
            {mobileDevice === false ? (
              sidebarToggle ? (
                <IconButton onClick={toggleSidebar} aria-label="close drawer">
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ ml: 0 }}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleSidebar}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              )
            ) : sidebarToggle ? (
              <IconButton onClick={toggleSidebar} aria-label="close drawer">
                <ChevronLeftIcon />
              </IconButton>
            ) : (
              ''
            )}
          </>
        </TopSection>
        <Box sx={{ mt: 2 }}>
          <SidebarMenu opened={sidebarToggle} />
        </Box>
      </SidebarWrapper>
    </>
  );
}

export default Sidebar;
