import { InputAdornment, SvgIcon, TextField } from '@mui/material';
import useDebounce from 'app/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';

export interface ISearchProps {
  onChangeSearchQuery: (searchQuery: string) => void;
  className?: string;
  placeholder: string;
}

const SearchInput = ({
  onChangeSearchQuery,
  placeholder,
  className,
}: ISearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      onChangeSearchQuery(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onChangeSearchQuery]);

  return (
    <TextField
      className={className}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon fontSize="small" color="action">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        ),
      }}
      onChange={event => setSearchQuery(event.target.value)}
      placeholder={placeholder}
      value={searchQuery}
      variant="outlined"
      inputProps={{ 'data-testid': 'search-input' }}
      /*  sx={{
        width: 500,
        [theme.breakpoints.down('lg')]: {
          width: 300,
        },
        [theme.breakpoints.down('md')]: {
          width: 200,
          mr: 1,
        },
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          pb: 2,
          mr: 0,
        },
      }} */
    />
  );
};

export default SearchInput;
