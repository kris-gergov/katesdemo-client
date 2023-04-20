import ViewListTwoTone from '@mui/icons-material/ViewListTwoTone';
import NoteAddTwoTone from '@mui/icons-material/NoteAddTwoTone';
import CalendarViewMonthTwoTone from '@mui/icons-material/CalendarViewMonthTwoTone';
import SwapVerticalCircleTwoTone from '@mui/icons-material/SwapVerticalCircleTwoTone';
import LogoutTwoTone from '@mui/icons-material/LogoutTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import { ROUTES } from 'app/constants';

const menuItems = [
  {
    heading: 'Manage',
    items: [
      {
        name: 'Shift list',
        icon: ViewListTwoTone,
        link: ROUTES.HOME,
      },
      {
        name: 'Create shift',
        icon: NoteAddTwoTone,
        link: ROUTES.CREATE_SHIFT,
      },
      {
        name: 'Calendar',
        icon: CalendarViewMonthTwoTone,
        link: ROUTES.CALENDAR,
      },
      {
        name: 'Summary',
        icon: SwapVerticalCircleTwoTone,
        link: ROUTES.SUMMARY,
      },
    ],
  },
  {
    heading: 'Account',
    items: [
      {
        name: 'Users',
        icon: PeopleAltTwoToneIcon,
        link: ROUTES.USERS,
      },
      {
        name: 'Add user',
        icon: PersonAddAltTwoToneIcon,
        link: ROUTES.CREATE_USER,
      },
    ],
  },
  {
    heading: 'Logout',
    items: [
      {
        name: 'Log out',
        icon: LogoutTwoTone,
        link: ROUTES.LOGOUT,
      },
    ],
  },
];

export default menuItems;
