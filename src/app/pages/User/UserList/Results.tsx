import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
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

import {
  applyFilters,
  applyPagination,
  TableResultsHelpers,
} from './TableResultsHelpers';
import { UserType } from 'types/user-type';
import ISorter from 'interfaces/ISorter';
import IUser from 'interfaces/IUser';
import { genericSort } from 'utils/genericSort';
import { genericSearch } from 'utils/genericSearch';
import SearchInput from 'app/components/SearchInput';
import { genericSortOptions, userTypeOptions } from './inputUserOptions';
import { ROUTES } from 'app/constants';

type Props = {
  className?: string;
  users?: UserType[];
  deleteUser: (selectedUsers: string[]) => Promise<void>;
};

const Results = ({ className, users, deleteUser, ...rest }: Props) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery('(max-width:650px)');
  const history = useHistory();

  //Explicitly stating that selectedUsers is an array of type string
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(mobileDevice ? 5 : 10);
  const [query, setQuery] = useState('');
  const [activeSorter, setActiveSorter] = useState<ISorter<IUser>>({
    property: 'createdAt',
    isDescending: true,
  });

  const handleDelete = async (singleId?: string) => {
    await deleteUser(singleId ? [singleId] : selectedUsers);
    setSelectedUsers([]);
  };

  const handleEdit = (user: UserType) => {
    history.push({
      pathname: ROUTES.CREATE_USER,
      state: {
        user: {
          email: user.email,
          name: user.name,
          address: {
            city: user.address.city,
            postcode: user.address.postcode,
            street: user.address.street,
          },
          type: user.type,
          phone: user.phone,
          deposit: user.deposit,
        },
        userId: user?._id,
      },
    });
  };

  /* Explicitly stating that sort is an array of type string so we'll know
 on mouser hover that value is of type string. */
  const [filters, setFilters] = useState<TableResultsHelpers | any>({
    userType: null,
  });

  const handleUserTypeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    let value: any = null;
    if (event.target.value !== 'all') {
      value = event.target.value;
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      userType: value,
    }));
  };

  if (!users || !users.length) {
    return <LinearProgress />;
  }

  /*Updating all selected users */
  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users.map(user => user._id) : []);
  };

  /*Updating one selected user */
  const handleSelectOneUser = (userId: string): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers(prevSelected => [...prevSelected, userId]);
    } else {
      setSelectedUsers(prevSelected =>
        prevSelected.filter(id => id !== userId),
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

  const queriedUsers = users.filter(user =>
    genericSearch<IUser>(user, ['name'], query),
  );
  const filteredUsers = applyFilters(queriedUsers, filters);
  const sortedUsers = filteredUsers.sort((userA, userB) =>
    genericSort<IUser>(userA, userB, activeSorter),
  );
  const paginatedUsers = applyPagination(sortedUsers, page, limit);
  const enableBulkOperations = selectedUsers.length > 0;
  const selectedSomeUsers =
    selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;

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
          [theme.breakpoints.up('sm')]: {},
        }}
      >
        <SearchInput
          onChangeSearchQuery={query => setQuery(query)}
          placeholder="Search users"
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
            label="User type"
            name="userType"
            onChange={handleUserTypeChange}
            select
            SelectProps={{ native: true }}
            value={filters.userType || 'all'}
            variant="outlined"
            sx={{ flexBasis: 200 }}
          >
            {userTypeOptions.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </TextField>
        </Box>
        <TextField
          label="Sort By"
          name="sort"
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
              checked={selectedAllUsers}
              indeterminate={selectedSomeUsers}
              onChange={handleSelectAllUsers}
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
                    checked={selectedAllUsers}
                    indeterminate={selectedSomeUsers}
                    onChange={handleSelectAllUsers}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>Post code</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Deposit</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map(user => {
                const isUserSelected = selectedUsers.includes(user._id);
                return (
                  <TableRow hover key={user._id} selected={isUserSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isUserSelected}
                        onChange={() => handleSelectOneUser(user._id)}
                        value={isUserSelected}
                      />
                    </TableCell>

                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.address?.street}</TableCell>
                    <TableCell>{user.address?.postcode}</TableCell>
                    <TableCell>{user.address?.city}</TableCell>
                    <TableCell>
                      £{numeral(user.deposit).format(`£0,0.00`)}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEdit(user)}
                        data-testid="edit-user-button"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user._id)}
                        data-testid="delete-user-button"
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
            count={filteredUsers.length}
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
