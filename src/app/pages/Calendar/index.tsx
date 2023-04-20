import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  Dialog,
  Divider,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';

import { RootState } from 'store/reducers';
import { EventType, ViewType } from 'types/calendar-type';
import {
  closeModal,
  getEvents,
  selectEvent,
  updateEvent,
} from 'app/features/calendar/calendarSlice';
import AddEditEventForm from './AddEditEventForm';
import Header from 'app/components/Header';
import Toolbar from './Toolbar';

const FullCalendarWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};

    & .fc-license-message {
      display: none;
    }
    .fc {
      font-family: 'Nunito';

      .fc-col-header-cell {
        padding: ${theme.spacing(1)};
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-scrollgrid {
        border: 2px solid ${theme.colors.alpha.black[10]};
        border-right-width: 1px;
        border-bottom-width: 1px;
      }

      .fc-cell-shaded,
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[5]};
      }

      .fc-list-event-graphic {
        padding-right: ${theme.spacing(1)};
      }

      .fc-theme-standard td, .fc-theme-standard th,
      .fc-col-header-cell {
        border: 1px solid ${theme.colors.alpha.black[10]};
      }

      .fc-event {
        padding: ${theme.spacing(0.1)} ${theme.spacing(0.3)};
      }

      .fc-list-day-side-text {
        font-weight: normal;
        color: ${theme.colors.alpha.black[70]};
      }

      .fc-list-event:hover td,
      td.fc-daygrid-day.fc-day-today {
        background-color: ${theme.colors.primary.lighter};
      }

      td.fc-daygrid-day:hover,
      .fc-highlight {
        background: ${theme.colors.alpha.black[10]};
      }

      .fc-daygrid-dot-event:hover, 
      .fc-daygrid-dot-event.fc-event-mirror {
        background: ${theme.colors.primary.lighter};
      }

      .fc-daygrid-day-number {
        padding: ${theme.spacing(1)};
        font-weight: bold;
      }

      .fc-list-sticky .fc-list-day > * {
        background: ${theme.colors.alpha.black[5]} !important;
      }

      .fc-cell-shaded, 
      .fc-list-day-cushion {
        background: ${theme.colors.alpha.black[10]} !important;
        color: ${theme.colors.alpha.black[70]} !important;
      }

      &.fc-theme-standard td, 
      &.fc-theme-standard th,
      &.fc-theme-standard .fc-list {
        border-color: ${theme.colors.alpha.black[30]};
      }
    }
`,
);

const Calendar = () => {
  const dispatch = useDispatch();
  const { events, isModalOpen } = useSelector(
    (state: RootState) => state.calendar,
  );
  const selectedEvent = useSelector(selectedEventSelector);

  const mobileDevice = useMediaQuery('(max-width:600px)');

  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<ViewType>(
    mobileDevice ? 'listWeek' : 'dayGridMonth',
  );

  const dateInAWeek = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7);
  const weekRange = `${date.toLocaleDateString()} - ${dateInAWeek.toLocaleDateString()}`;

  const calendarRef = useRef<FullCalendar | null>(null);

  const theme = useTheme();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  /* calendarRef is a reference to the element FullCalendar*/
  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;
    /*the getApi here is part of FullCalendar. If you 'dot space'
    the 'calendarEl,' you'll see the interfaces or APIs available. */
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateToday = (): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: ViewType): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  /*the arg: any - could be a string or a number */
  const handleEventSelect = (arg: any): void => {
    dispatch(selectEvent(arg.event.id));
  };

  /*We have here a try-catch block because handleEventDrop is an async
   function */
  const handleEventDrop = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEvent({
          start: event.start,
          id: event.id,
        } as any),
      );
    } catch (err) {
      console.error(err);
    }
  };

  /*   const handleEventResize = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEvent({
          start: event.start,
          id: event.id,
        } as any),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRangeSelect = (arg: any): void => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };
 */
  return (
    <>
      <Helmet>
        <title>Calendar - Applications</title>
      </Helmet>
      <Grid
        sx={{
          px: 1,
          [theme.breakpoints.down('sm')]: {
            px: 0.5,
          },
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Card>
            <Box p={3}>
              <Header
                title="Here's what you planned"
                showImportExport={false}
                breadcrumbText="Calendar"
                createButtonText="New shift"
                createButtonLink="/create-shift"
              />
              <Toolbar
                date={date}
                onDateNext={handleDateNext}
                onDatePrev={handleDatePrev}
                onDateToday={handleDateToday}
                onViewChange={handleViewChange}
                view={view}
              />
            </Box>
            <Divider />
            <FullCalendarWrapper>
              <FullCalendar
                allDayMaintainDuration
                droppable
                editable
                selectable
                weekends
                dayMaxEventRows
                eventResizableFromStart
                headerToolbar={false}
                //select={handleRangeSelect}
                eventClick={handleEventSelect}
                eventDrop={handleEventDrop}
                //eventResize={handleEventResize}
                initialDate={date}
                initialView={view}
                events={events}
                height={800}
                ref={calendarRef}
                rerenderDelay={10}
                noEventsContent={`No shifts to display for ${weekRange}`}
                /*       eventContent={({ view, event }) => {
                  if (view.type === 'listWeek') {
                    return { html: '<i>some html</i>' };
                  }
                }} */
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                  timelinePlugin,
                ]}
              />
            </FullCalendarWrapper>
          </Card>
          <Dialog
            maxWidth={mobileDevice ? 'sm' : 'md'}
            fullWidth
            onClose={handleModalClose}
            open={isModalOpen}
          >
            {isModalOpen && (
              <AddEditEventForm
                event={selectedEvent}
                onCancel={handleModalClose}
                onDeleteComplete={handleModalClose}
              />
            )}
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default Calendar;

const selectedEventSelector = (state: RootState): EventType | undefined => {
  const { events, selectedEventId } = state.calendar;

  if (selectedEventId) {
    return events?.find(_event => _event.id === selectedEventId);
  } else {
    return undefined;
  }
};
