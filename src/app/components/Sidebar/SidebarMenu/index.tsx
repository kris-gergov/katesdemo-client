import {
  ListSubheader,
  Box,
  alpha,
  darken,
  lighten,
  List,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SidebarMenuItem from './item';
import menuItems from './items';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    margin-bottom: ${theme.spacing(1.5)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemIconColor};
      line-height: 1.4;
    }
`,
);

interface SubMenuWrapperProps {
  mobile: boolean;
}

const SubMenuWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== 'mobile' && prop !== 'sx',
  name: 'MyThemeComponent',
  slot: 'Root',
})<SubMenuWrapperProps>(
  ({ theme, mobile }) => `
    .MuiList-root {
      padding: 0;

      .MuiListItem-root {

        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          min-width: 90%;
          justify-content: flex-start;
          padding:  ${theme.spacing(1, 2)};
          position: relative;
          @media (max-width: 650px) {
            min-width: 0;
            padding: ${theme.spacing(1, 0)};
            padding-left: 14px;
          }

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(3.5)};

            .MuiBadge-standard {
              background: ${theme.colors.primary.main};
              border-radius: ${theme.general.borderRadiusSm};
              font-size: ${theme.typography.pxToRem(10)};
              font-weight: bold;
              text-transform: uppercase;
              color: ${theme.palette.primary.contrastText};
            }
          }
    
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            transition: ${theme.transitions.create(['all'])};
            border-radius: ${theme.general.borderRadius};
            background: ${lighten(theme.sidebar.menuItemBgActive, 0.1)};
            box-shadow: 0px 1px 2px 0 ${alpha(
              darken(theme.sidebar.menuItemIconColor, 0.2),
              0.46,
            )};
            font-size: ${theme.typography.pxToRem(18)};
            margin-right: 0;
            margin-left: 0;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${
              theme.palette.mode === 'dark'
                ? lighten(theme.sidebar.menuItemBgActive, 0.8)
                : theme.sidebar.menuItemIconColor
            };
          }
          
          .MuiButton-endIcon {
            margin-left: auto;
            font-size: ${theme.typography.pxToRem(20)};
          }
          
          .MuiButton-StartIcon {
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.Mui-active,
          &:hover {
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
                color: ${theme.sidebar.menuItemColorActive};
            }
          }

          &.Mui-active {
            background-color: ${alpha(theme.sidebar.menuItemBgActive, 0.8)};
            box-shadow: 0px 1px 2px 0 ${alpha(
              darken(theme.sidebar.menuItemIconColor, 0.2),
              0.46,
            )};
            color: ${theme.sidebar.menuItemColorActive};
            font-weight: bold;


            .MuiButton-startIcon {
                background: ${theme.colors.primary.main};
                color: ${theme.palette.primary.contrastText};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(6)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1.5, 0)};
          }

          .MuiListItem-root {
            padding: ${theme.spacing(0)};

            .MuiButton-root {
              padding: ${theme.spacing(0.7, 2, 0.7, 7)};

              .MuiBadge-root {
                right: ${theme.spacing(2.5)};
              }

              &.Mui-active,
              &:hover {
                box-shadow: none;
                background-color: ${theme.sidebar.menuItemBg};
              }
            }
          }
        }
      }
    }
`,
);

const renderSidebarMenuItems = ({ items, path, mobile, opened }) => (
  <SubMenuWrapper mobile>
    <List component="div">
      {items.reduce(
        (ev, item) => reduceChildRoutes({ ev, item, path, mobile, opened }),
        [],
      )}
    </List>
  </SubMenuWrapper>
);

const reduceChildRoutes = ({ ev, path, item, mobile, opened }) => {
  const key = item.name;

  const exactMatch = item.link ? !!matchPath(item.link, path) : false;

  ev.push(
    <SidebarMenuItem
      key={key}
      active={exactMatch}
      name={!mobile ? item.name : ''}
      link={item.link}
      badge={item.badge}
      badgeTooltip={item.badgeTooltip}
      icon={item.icon}
      mobile={mobile}
      opened={opened}
    />,
  );

  return ev;
};

function SidebarMenu({ opened }) {
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <>
      {menuItems.map(section => (
        <MenuWrapper key={section.heading}>
          <List
            component="div"
            subheader={
              <ListSubheader
                component="div"
                disableSticky
                sx={{
                  padding: `${
                    opened && !mobileDevice
                      ? theme.spacing(1, 3.5)
                      : theme.spacing(1, 2)
                  }`,
                }}
              >
                {opened || !mobileDevice ? t(section.heading) : ''}
              </ListSubheader>
            }
          >
            {renderSidebarMenuItems({
              items: section.items,
              path: location.pathname,
              mobile: mobileDevice,
              opened,
            })}
          </List>
        </MenuWrapper>
      ))}
    </>
  );
}

export default SidebarMenu;
