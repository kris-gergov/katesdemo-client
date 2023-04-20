import { UserType } from 'types/user-type';

export type TableResultsHelpers = {
  userType?: 'cleaner' | 'client';
  paid?: boolean;
};

export const applyFilters = (
  users: UserType[],
  filters: TableResultsHelpers,
): UserType[] => {
  return users.filter(user => {
    let matches = true;
    /* the user here comes from the parent component. */
    if (filters.userType && user.type !== filters.userType) {
      matches = false;
    }

    return matches;
  });
};

/* to limit the users or the number of search results shown*/
export const applyPagination = (
  users: UserType[],
  page: number,
  limit: number,
): UserType[] => {
  return users.slice(page * limit, page * limit + limit);
};
