import { Box, Container, useTheme } from '@mui/material';
import Sidebar from 'app/components/Sidebar';
import { SidebarContext } from 'app/contexts/SidebarContext';
import { useContext } from 'react';

const Layout = props => {
  const theme = useTheme();
  const { sidebarToggle: sidebarOpened } = useContext(SidebarContext);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        [theme.breakpoints.down('md')]: {
          paddingX: 1,
        },
        [theme.breakpoints.down('sm')]: {
          paddingX: 0,
          width: 'auto',
        },
      }}
    >
      <Sidebar />
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          width: '100%',

          '.MuiDrawer-pw': {
            '& .MuiDrawer-paper': {
              width: `calc(400px + ${theme.spacing(3)})`,
              background: 'none',
              border: 0,
              pl: 0,
            },
          },

          '.MuiDrawer-hd': {
            '& .MuiDrawer-paper': {
              background: 'none',
              border: 0,
              width: `calc(360px + ${theme.spacing(4)})`,
              pl: 0,
            },
          },

          '.MuiDrawer-fm': {
            '& .MuiDrawer-paper': {
              borderRadius: theme.general.borderRadius,
              width: `calc(400px - ${theme.spacing(3)})`,
              height: `calc(100% - 80px - ${theme.spacing(6)})`,
              m: 3,
            },
          },

          '.Mui-FixedWrapper': {
            height: `calc(100vh - ${theme.spacing(17)})`,
            minHeight: `calc(100vh - ${theme.spacing(17)})`,
            margin: theme.spacing(4),
            background: theme.colors.alpha.white[100],
            borderRadius: theme.general.borderRadius,
            overflow: 'hidden',
            border: `${theme.colors.alpha.black[30]} solid 1px`,

            '.Mui-FixedWrapperContent': {
              overflow: 'auto',
              height: `calc(100vh - ${theme.spacing(17.5)})`,
            },

            '.MuiDrawer-root.MuiDrawer-docked': {
              position: 'relative',

              '.MuiPaper-root': {
                height: `calc(100vh - ${theme.spacing(17)})`,
                minHeight: `calc(100vh - ${theme.spacing(17)})`,
                position: 'absolute',
                top: 0,
                left: 0,
              },
            },
          },

          '.footer-wrapper': {
            margin: 0,
            background: 'transparent',
            boxShadow: 'none',
          },

          '.MuiPageTitle-wrapper': {
            pt: theme.spacing(3),
            pb: theme.spacing(6),
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            width: `calc(100% - ${
              sidebarOpened ? theme.sidebar.width : theme.spacing(10)
            } - ${theme.spacing(4)})`,
            pt: 3,
            pl: 0,
            ml: `calc(${
              sidebarOpened ? theme.sidebar.width : theme.spacing(10)
            } + ${theme.spacing(4)})`,
            [theme.breakpoints.up('lg')]: {
              pl: 3,
            },
            [theme.breakpoints.up('md')]: {
              pl: 2,
            },
            [theme.breakpoints.down('sm')]: {
              ml: 0,
              pt: 0,
              width: '100%',
            },
          }}
        >
          <Box
            flexGrow={1}
            pt={1}
            sx={{
              [theme.breakpoints.down('sm')]: {
                pt: 0,
              },
            }}
          >
            <Box
              sx={{
                [theme.breakpoints.down('sm')]: {
                  height: '100%',
                },
              }}
            >
              {props.children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
