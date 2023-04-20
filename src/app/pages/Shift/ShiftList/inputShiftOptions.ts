import IShift from 'interfaces/IShift';
import { Paths } from 'types/util-types';

export const paymentMethodOptions = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'bank',
    name: 'Bank',
  },
  {
    id: 'cash',
    name: 'Cash',
  },
];

export const availabilityOptions = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'available',
    name: 'Available',
  },
  {
    id: 'unavailable',
    name: 'Unavailable',
  },
];

export const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)',
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)',
  },
  {
    value: 'createdAt|desc',
    label: 'Creation date (newest first)',
  },
  {
    value: 'createdAt|asc',
    label: 'Creation date (oldest first)',
  },
];

type SortOptionsType = {
  value: Paths<IShift>;
  label: string;
};

export const genericSortOptions: SortOptionsType[] = [
  {
    value: 'createdAt',
    label: 'Created at',
  },
  {
    value: 'cleaner.name',
    label: 'Cleaner',
  },
  {
    value: 'client.name',
    label: 'Client',
  },
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'updatedAt',
    label: 'Updated at',
  },
];
