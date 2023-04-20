import { PaymentMethod, ShiftType } from 'types/shift-type';

export type TableResultsHelpers = {
  paymentMethod?: PaymentMethod;
  paid?: boolean;
};

export const applyFilters = (
  shifts: ShiftType[],
  filters: TableResultsHelpers,
): ShiftType[] => {
  return shifts.filter(shift => {
    let matches = true;

    if (
      filters.paymentMethod &&
      shift.paymentMethod !== filters.paymentMethod
    ) {
      matches = false;
    }
    if (filters.paid && shift.paid) {
      matches = false;
    }
    return matches;
  });
};

/* to limit the shifts or the number of search results shown*/
export const applyPagination = (
  shifts: ShiftType[],
  page: number,
  limit: number,
): ShiftType[] => {
  return shifts.slice(page * limit, page * limit + limit);
};
