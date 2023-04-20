import {
  ButtonGroup,
  Button,
  Hidden,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  ViewWeekOutlined as ViewWeekIcon,
  ViewAgendaOutlined as ViewAgendaIcon,
  ViewComfyOutlined as ViewConfigIcon,
  ViewDayOutlined as ViewDayIcon,
} from '@mui/icons-material';
import moment from 'moment';
import { ElementType, ReactNode } from 'react';
import { ViewType } from 'types/calendar-type';

type ViewOption = {
  label: string;
  value: ViewType;
  icon: ElementType;
};
type Props = {
  children?: ReactNode;
  className?: string;
  date: Date;
  onDateNext?: () => void;
  onDatePrev?: () => void;
  onDateToday?: () => void;
  onAddClick?: () => void;
  /* takes a view object and returns nothing or void */
  onViewChange?: (view: ViewType) => void;
  view: ViewType;
};

const Toolbar = ({
  className,
  date,
  onDateNext,
  onDatePrev,
  onDateToday,
  onAddClick,
  onViewChange,
  view,
  ...rest // the rest parameter
}: Props) => {
  const theme = useTheme();

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="space-between"
      spacing={3}
      mt={2}
      {...rest}
    >
      <Grid
        item
        sx={{
          [theme.breakpoints.down('sm')]: {
            pt: '0px !important',
          },
        }}
      >
        <ButtonGroup size="small">
          <Button onClick={onDatePrev}>Prev</Button>
          <Button onClick={onDateToday}>Today</Button>
          <Button onClick={onDateNext}>Next</Button>
        </ButtonGroup>
      </Grid>
      <Hidden smDown>
        <Grid item>
          <Typography variant="h3" color="textPrimary">
            {moment(date).format('MMMM YYYY')}
          </Typography>
        </Grid>
        <Grid item>
          {viewOptions.map(viewOption => {
            const Icon = viewOption.icon;
            return (
              <Tooltip key={viewOption.value} title={viewOption.label}>
                <IconButton
                  color={viewOption.value === view ? 'primary' : 'default'}
                  onClick={() => {
                    if (onViewChange) {
                      onViewChange(viewOption.value);
                    }
                  }}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            );
          })}
        </Grid>
      </Hidden>
    </Grid>
  );
};
export default Toolbar;

const viewOptions: ViewOption[] = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: ViewConfigIcon,
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: ViewWeekIcon,
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: ViewDayIcon,
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: ViewAgendaIcon,
  },
];
