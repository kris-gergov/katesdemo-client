import {
  Box,
  Typography,
  Divider,
  IconButton,
  SvgIcon,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Trash as TrashIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { yupShiftValidation } from '../Shift/ShiftCreate/schema/yupShiftValidation';
import { EventType } from 'types/calendar-type';
import { deleteEvent } from 'app/features/calendar/calendarSlice';
import QuillEditor from 'app/components/Quill';
import { ROUTES } from 'app/constants';

type Props = {
  event?: EventType;
  onCancel: () => void;
  onDeleteComplete: () => void;
};

const AddEditEventForm = ({ event, onCancel, onDeleteComplete }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const mobileDevice = useMediaQuery('(max-width:600px)');

  const handleDelete = async (): Promise<void> => {
    try {
      await dispatch(deleteEvent(event?.id));
      onDeleteComplete();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    history.push({
      pathname: ROUTES.CREATE_SHIFT,
      state: {
        shift: {
          cleaner: {
            id: event?.extendedProps.cleaner.id,
          },
          client: {
            id: event?.extendedProps.client.id,
          },
          commission: event?.extendedProps.commission,
          date: event?.start,
          hours: event?.extendedProps.hours,
          paid: event?.extendedProps.paid,
          paymentDate: event?.extendedProps.paymentDate,
          paymentMethod: event?.extendedProps.paymentMethod,
          amount: event?.extendedProps.amount,
          notes: event?.extendedProps.notes,
        },
        shiftId: event?.id,
      },
    });
  };

  return (
    <Formik
      initialValues={getInitialValues(event)}
      validationSchema={yupShiftValidation}
      onSubmit={async (values, {}) => {}}
    >
      {/* deconstructing the Formik props */}
      {({ handleSubmit, isSubmitting, values }) => (
        <>
          {/* this will trigger the onSubmit of Formik */}
          <form onSubmit={handleSubmit}>
            <Box px={3} pt={3}>
              <Typography
                align="center"
                gutterBottom
                variant="h3"
                color="textPrimary"
              >
                {`Shift on ${new Date(values.start).toUTCString()}`}
              </Typography>
            </Box>
            {/*  TextField -- make sure to map everything to title */}
            <Box px={mobileDevice ? 2 : 4} pt={2} pb={3}>
              <List
                sx={{
                  border: '1px solid lightgray',
                  borderRadius: 1,
                }}
              >
                <Grid container justifyContent="space-around">
                  <Grid
                    item
                    xs={12}
                    lg={5}
                    mx={mobileDevice ? 0 : 2}
                    my={mobileDevice ? 0 : 1}
                  >
                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Cleaner
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        {values.extendedProps.cleaner.name}
                      </Typography>
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Client
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        {values.extendedProps.client.name}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Hours
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        {values.extendedProps.hours}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Amount
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        £{values.extendedProps.amount}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Commission
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        £{values.extendedProps.commission}
                      </Typography>
                    </ListItem>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={5}
                    mx={mobileDevice ? 0 : 2}
                    my={mobileDevice ? 0 : 1}
                  >
                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Paid
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        {values.extendedProps.paid ? (
                          <CheckBoxTwoToneIcon color="success" />
                        ) : (
                          <CancelPresentationTwoToneIcon color="error" />
                        )}
                      </Typography>
                    </ListItem>

                    {values.extendedProps.paid &&
                    values.extendedProps.paymentDate ? (
                      <ListItem disableGutters>
                        <ListItemText
                          sx={{
                            width: '40%',
                            flex: 'initial',
                            mr: 2,
                          }}
                          primary={
                            <Typography
                              variant="h4"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              Payment date
                            </Typography>
                          }
                        />
                        <Typography variant="body2">
                          {values.extendedProps.paymentDate
                            ? `${new Date(
                                values.extendedProps.paymentDate,
                              ).toDateString()}`
                            : ''}
                        </Typography>
                      </ListItem>
                    ) : (
                      ''
                    )}
                    <ListItem disableGutters>
                      <ListItemText
                        sx={{
                          width: '40%',
                          flex: 'initial',
                          mr: 2,
                        }}
                        primary={
                          <Typography
                            variant="h4"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            Payment method
                          </Typography>
                        }
                      />
                      <Typography variant="body2">
                        {values.extendedProps.paymentMethod}
                      </Typography>
                    </ListItem>
                    {values.extendedProps.notes ? (
                      <ListItem disableGutters>
                        <ListItemText
                          sx={{
                            width: '40%',
                            flex: 'initial',
                            mr: 2,
                          }}
                          primary={
                            <Typography
                              variant="h4"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              Notes
                            </Typography>
                          }
                        />
                        <Box>
                          <Tooltip
                            title={
                              <QuillEditor
                                value={values.extendedProps.notes}
                                readOnly={true}
                                theme={'bubble'}
                              />
                            }
                            placement="bottom"
                            sx={{ alignSelf: 'center' }}
                          >
                            <Button endIcon={<ReadMoreIcon />} sx={{ ml: -2 }}>
                              View notes
                            </Button>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </List>
            </Box>
            <Divider />
            <Box py={2} px={4} display="flex" alignItems="center">
              <IconButton
                onClick={() => handleDelete()}
                data-testid="delete-event-button"
              >
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>

              <Box flexGrow={1} />
              <Button onClick={onCancel} data-testid="cancel-button">
                Cancel
              </Button>
              <Button
                variant="contained"
                data-testid="edit-event-button"
                color="primary"
                sx={{ ml: 2 }}
                onClick={() => handleEdit()}
              >
                Edit
              </Button>
            </Box>
          </form>
        </>
      )}
    </Formik>
  );
};

export default AddEditEventForm;

const getInitialValues = (event?: EventType) => {
  if (event) {
    return {
      ...event,
    };
  }

  return {
    allDay: false,
    color: '',
    description: '',
    end: moment().add(30, 'minutes').toDate(),
    start: moment().toDate(),
    title: '',
    submit: null,
    extendedProps: {
      client: {
        _id: '',
        name: '',
        address: { street: '', city: '', postcode: '' },
      },
      cleaner: { _id: '', name: '' },
      hours: 0,
      amount: 0,
      paid: false,
      paymentDate: null,
      paymentMethod: 'cash',
      commission: 0,
      notes: '',
      createdAt: null,
      updatedAt: null,
    },
  };
};
