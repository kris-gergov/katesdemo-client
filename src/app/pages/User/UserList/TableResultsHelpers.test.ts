import { UserType } from 'types/user-type';
import {
  applyFilters,
  applyPagination,
  TableResultsHelpers,
} from './TableResultsHelpers';

describe('applyFilters', () => {
  const mockUsers: UserType[] = [
    {
      _id: '1',
      email: 'user1@test.com',
      password: 'password1',
      name: 'User One',
      type: 'cleaner',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        postcode: '12345',
      },
      deposit: 100,
      phone: '123-456-7890',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      email: 'user2@test.com',
      password: 'password2',
      name: 'User Two',
      type: 'client',
      address: {
        street: '456 Oak St',
        city: 'Anytown',
        postcode: '54321',
      },
      deposit: 200,
      phone: '234-567-8901',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('should return all users if no filters are applied', () => {
    const filteredUsers = applyFilters(mockUsers, {});
    expect(filteredUsers).toEqual(mockUsers);
  });

  it('should return only cleaner users if userType filter is "cleaner"', () => {
    const filters: TableResultsHelpers = { userType: 'cleaner' };
    const filteredUsers = applyFilters(mockUsers, filters);
    expect(filteredUsers).toHaveLength(1);
    expect(filteredUsers[0].type).toBe('cleaner');
  });
});

describe('applyPagination', () => {
  const mockUsers: UserType[] = [
    {
      _id: '1',
      email: 'user1@test.com',
      password: 'password1',
      name: 'User One',
      type: 'cleaner',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        postcode: '12345',
      },
      deposit: 100,
      phone: '123-456-7890',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      email: 'user2@test.com',
      password: 'password2',
      name: 'User Two',
      type: 'client',
      address: {
        street: '456 Oak St',
        city: 'Anytown',
        postcode: '54321',
      },
      deposit: 200,
      phone: '234-567-8901',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '3',
      email: 'user3@test.com',
      password: 'password3',
      name: 'User Three',
      type: 'client',
      address: {
        street: '789 Maple St',
        city: 'Anytown',
        postcode: '67890',
      },
      deposit: 300,
      phone: '345-678-9012',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('should return first page of users with the specified limit', () => {
    const paginatedUsers = applyPagination(mockUsers, 0, 2);
    expect(paginatedUsers).toHaveLength(2);
    expect(paginatedUsers[0]._id).toBe('1');
    expect(paginatedUsers[1]._id).toBe('2');
  });

  it('should return second page of users with the specified limit', () => {
    const paginatedUsers = applyPagination(mockUsers, 1, 2);
    expect(paginatedUsers).toHaveLength(1);
    expect(paginatedUsers[0]._id).toBe('3');
  });

  it('should return an empty array if page is greater than total number of pages', () => {
    const paginatedUsers = applyPagination(mockUsers, 2, 2);
    expect(paginatedUsers).toEqual([]);
  });
});
