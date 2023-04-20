import { useContext } from 'react';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';

import { Button, ListItem, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SidebarContext } from 'app/contexts/SidebarContext';
import { ROUTES } from 'app/constants';

type SidebarMenuItemProps = {
  active: boolean;
  link: string;
  icon: React.ElementType;
  badge: string;
  badgeTooltip: string;
  name: string;
  mobile: boolean;
  opened: boolean;
};

const SidebarMenuItem = ({
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  active = false,
  name,
  mobile,
  opened,
  ...rest
}: SidebarMenuItemProps) => {
  const { t } = useTranslation();
  const { closeSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.replace(ROUTES.HOME);
  };

  return (
    <ListItem
      component="div"
      key={name}
      {...rest}
      sx={{
        padding: `1px ${
          opened && !mobile ? theme.spacing(2) : theme.spacing(1)
        };`,
        justifyContent: `${mobile ? 'center' : 'flex-start'}`,
      }}
    >
      <Button
        disableRipple
        activeClassName={active ? 'Mui-active' : ''}
        component={RouterLink}
        onClick={link === ROUTES.LOGOUT ? handleLogout : closeSidebar}
        to={link}
        startIcon={Icon && <Icon />}
      >
        <Box
          sx={{
            paddingLeft: `${opened ? theme.spacing(1.5) : 0};`,
          }}
        >
          {!mobile ? (opened ? t(name) : '') : ''}
        </Box>
      </Button>
    </ListItem>
  );
};

export default SidebarMenuItem;
