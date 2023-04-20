import { ChangeEvent, useState } from 'react';
import { ShiftType } from 'types/shift-type';
import {
  applyFilters,
  applyPagination,
  TableResultsHelpers,
} from './tableResultsHelpers';
import { paymentMethodOptions, genericSortOptions } from './inputShiftOptions';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  LinearProgress,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Edit as EditIcon, Trash as TrashIcon } from 'react-feather';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ISorter from 'interfaces/ISorter';
import IShift from 'interfaces/IShift';
import { genericSort } from 'utils/genericSort';
import { genericSearch } from 'utils/genericSearch';
import SearchInput from 'app/components/SearchInput';
import Label from 'app/components/Label';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/constants';

type Props = {
  className?: string;
  shifts?: ShiftType[];
  deleteShift: (selectedShifts: string[]) => Promise<void>;
};

const Results = ({ className, shifts, deleteShift, ...rest }: Props) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery('(max-width:650px)');
  const history = useHistory();

  //Explicitly stating that selectedShifts is an array of type string
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(mobileDevice ? 5 : 10);
  const [query, setQuery] = useState('');
  const [activeSorter, setActiveSorter] = useState<ISorter<IShift>>({
    property: 'createdAt',
    isDescending: true,
  });

  const handleDelete = async (singleId?: string) => {
    await deleteShift(singleId ? [singleId] : selectedShifts);
    setSelectedShifts([]);
  };

  const handleEdit = (shift: ShiftType) => {
    history.push({
      pathname: ROUTES.CREATE_SHIFT,
      state: {
        shift: {
          cleaner: {
            id: shift.cleaner.id,
          },
          client: {
            id: shift.client.id,
          },
          commission: shift.commission,
          date: shift.date,
          hours: shift.hours,
          paid: shift.paid,
          paymentDate: shift.paymentDate,
          paymentMethod: shift.paymentMethod,
          amount: shift.amount,
          notes: shift.notes,
        },
        shiftId: shift?._id,
      },
    });
  };

  /* Explicitly stating that sort is an array of type string so we'll know
 on mouser hover that value is of type string. */
  const [filters, setFilters] = useState<TableResultsHelpers | any>({
    paymentMethod: null,
    paid: null,
  });

  const handlePaymentMethodChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    event.persist();
    let value: any = null;
    if (event.target.value !== 'all') {
      value = event.target.value;
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      paymentMethod: value,
    }));
  };

  const handlePaidChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    let value: any = null;
    if (event.target.checked) {
      value = true;
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      paid: value,
    }));
  };

  if (!shifts || !shifts.length) {
    return <LinearProgress />;
  }

  const handleSelectAllShifts = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSelectedShifts(
      event.target.checked ? shifts.map(shift => shift._id) : [],
    );
  };

  const handleSelectOneShift = (
    event: ChangeEvent<HTMLInputElement>,
    shiftId: string,
  ): void => {
    if (!selectedShifts.includes(shiftId)) {
      setSelectedShifts(prevSelected => [...prevSelected, shiftId]);
    } else {
      setSelectedShifts(prevSelected =>
        prevSelected.filter(id => id !== shiftId),
      );
    }
  };

  /*This is for the pagination*/
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const queriedShifts = shifts.filter(shift =>
    genericSearch<IShift>(shift, ['cleaner.name', 'client.name'], query),
  );
  const filteredShifts = applyFilters(queriedShifts, filters);
  const sortedShifts = filteredShifts.sort((shiftA, shiftB) =>
    genericSort<IShift>(shiftA, shiftB, activeSorter),
  );
  const paginatedShifts = applyPagination(sortedShifts, page, limit);
  const enableBulkOperations = selectedShifts.length > 0;
  const selectedSomeShifts =
    selectedShifts.length > 0 && selectedShifts.length < shifts.length;
  const selectedAllShifts = selectedShifts.length === shifts.length;

  return (
    <>
      <Box
        pb={2}
        pt={1}
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 0.75fr',
          gap: 2,
          [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
          },
        }}
      >
        <SearchInput
          onChangeSearchQuery={query => setQuery(query)}
          placeholder="Search shifts"
        />
        <Box
          sx={{
            [theme.breakpoints.down('md')]: {
              order: 3,
              gridColumn: '1 / 3',
              display: 'flex',
              gap: 2,
            },
          }}
        >
          <TextField
            label="Payment method"
            name="paymentMethod"
            data-testid="payment-method-dropdown"
            onChange={handlePaymentMethodChange}
            select
            SelectProps={{ native: true }}
            value={filters.paymentMethod || 'all'}
            variant="outlined"
            sx={{ flexBasis: 200, width: '115px' }}
          >
            {paymentMethodOptions.map(method => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </TextField>

          <FormControlLabel
            sx={{ [theme.breakpoints.up('md')]: { pt: 0.5 } }}
            control={
              <Checkbox
                checked={filters.paid}
                onChange={handlePaidChange}
                name="paid"
                sx={{ ml: 2 }}
                data-testid="not-paid-checkbox"
              />
            }
            label="Not Paid"
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          data-testid="sort-by-dropdown"
          onChange={event =>
            setActiveSorter({
              property: event.target.value.split(',')[0] as any,
              isDescending: event.target.value.split(',')[1] === 'true',
            })
          }
          select
          SelectProps={{ native: true }}
          variant="outlined"
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          {genericSortOptions.map(option => {
            if (!option) {
              return <></>;
            }
            return (
              <>
                <option
                  key={`${option.value}-true`}
                  value={[option.value, 'true']}
                >
                  {option.label.toUpperCase()} (descending)
                </option>
                <option
                  key={`${option.value}-false`}
                  value={[option.value, 'false']}
                >
                  {option.label.toUpperCase()} (ascending)
                </option>
              </>
            );
          })}
        </TextField>
      </Box>

      {enableBulkOperations && (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              pl: 0.5,
              py: 1,
              position: 'absolute',
              width: '100%',
              zIndex: 2,
              backgroundColor: '#fafafa',
              borderRadius: '4px',
              border: '2px solid #1565c0',
            }}
          >
            <Checkbox
              checked={selectedAllShifts}
              indeterminate={selectedSomeShifts}
              onChange={handleSelectAllShifts}
            />
            <Button
              variant="outlined"
              onClick={() => handleDelete()}
              sx={{ marginLeft: '16px' }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
      <PerfectScrollbar style={{ overflowX: 'scroll' }}>
        <Box minWidth={1000}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllShifts}
                    indeterminate={selectedSomeShifts}
                    onChange={handleSelectAllShifts}
                  />
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Cleaner</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Payment date</TableCell>
                <TableCell>Payment method</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedShifts.map(shift => {
                const isShiftSelected = selectedShifts.includes(shift._id);
                return (
                  <TableRow hover key={shift._id} selected={isShiftSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isShiftSelected}
                        onChange={event =>
                          handleSelectOneShift(event, shift._id)
                        }
                        value={isShiftSelected}
                        sx={{ width: '42px' }}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(shift.date).toLocaleString([], {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>{shift.cleaner.name}</TableCell>
                    <TableCell>{shift.client.name}</TableCell>
                    <TableCell>{shift.hours}</TableCell>
                    <TableCell>
                      £{numeral(shift.amount).format(`£0,0.00`)}
                    </TableCell>
                    <TableCell>
                      £{numeral(shift.commission).format(`£0,0.00`)}
                    </TableCell>
                    <TableCell>
                      <Label color={shift.paid ? 'success' : 'error'}>
                        {shift.paid ? 'Paid' : 'Not paid'}
                      </Label>
                    </TableCell>
                    <TableCell>
                      {shift.paymentDate
                        ? new Date(shift.paymentDate).toLocaleDateString()
                        : 'Not paid'}
                    </TableCell>
                    <TableCell>{shift.paymentMethod}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEdit(shift)}
                        data-testid="edit-shift-button"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(shift._id)}
                        data-testid="delete-shift-button"
                      >
                        <SvgIcon fontSize="small">
                          <TrashIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            count={filteredShifts.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              '.MuiTablePagination-toolbar': {
                ml: 1,
                mb: 1,
              },
            }}
          />
        </Box>
      </PerfectScrollbar>
    </>
  );
};

export default Results;
