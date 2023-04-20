import { CreateUserType } from 'types/user-type';
import {
  getUsersAxios,
  postUserAxios,
  getSingleUserAxios,
  deleteUserAxios,
  updateSingleUserAxios,
} from './userService';
import axios from 'app/api/axios';
import {
  exampleCreateUser,
  exampleUserList,
} from 'app/features/calendar/calendarSlice.test-data';

jest.mock('app/api/axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getUsersAxios function', () => {
  let axiosGetSpy: jest.SpyInstance;

  beforeEach(() => {
    axiosGetSpy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make a GET request to the "user" endpoint', async () => {
    await getUsersAxios();

    expect(axiosGetSpy).toHaveBeenCalledWith('user');
  });

  it('should return an array of UserType objects', async () => {
    const expectedResponse = {
      data: { users: exampleUserList },
    };

    axiosGetSpy.mockResolvedValueOnce(expectedResponse);

    const response = await getUsersAxios();

    expect(response).toEqual(expectedResponse);
  });
});

describe('getSingleUserAxios function', () => {
  let axiosGetSpy: jest.SpyInstance;
  const userId = 'id-123';

  beforeEach(() => {
    axiosGetSpy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make a GET request to the "user" endpoint', async () => {
    await getSingleUserAxios(userId);

    expect(axiosGetSpy).toHaveBeenCalledWith(`user/${userId}`);
  });

  it('should return an array of UserType objects', async () => {
    const expectedResponse = {
      data: { user: exampleUserList[0] },
    };

    axiosGetSpy.mockResolvedValueOnce(expectedResponse);

    const response = await getSingleUserAxios(userId);

    expect(response).toEqual(expectedResponse);
  });
});

describe('postUserAxios', () => {
  const validUser: CreateUserType = {
    email: 'testclient@email.com',
    name: 'Test Client',
    type: 'client',
    address: {
      city: 'Test city',
      postcode: 'S10 D5A',
      street: 'Street test',
    },
    deposit: 0,
    password: 'asdasdasd43dfs',
    phone: 1234568910,
  };

  const invalidUser = {
    email: 'testclient@email.com',
    name: 'Test Client',
    type: 'boss', // invalid type
    address: {
      city: 'Test city',
      postcode: 'S10 D5A',
      street: 'Street test',
    },
    deposit: 0,
    password: 'asdasdasd43dfs',
    phone: 1234568910,
  };

  it('should make a successful POST request', async () => {
    const mockResponse = {
      data: validUser,
      status: 200,
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const response = await postUserAxios(validUser);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(validUser);
  });

  it('should throw an error for an invalid user object', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid user object'));

    await expect(postUserAxios(invalidUser as CreateUserType)).rejects.toThrow(
      'Invalid user object',
    );
  });

  it('should reject the Promise for an invalid user object', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid user object'));

    await expect(
      postUserAxios(invalidUser as CreateUserType),
    ).rejects.toBeTruthy();
  });

  it('should resolve the Promise with the expected data for a valid user object', async () => {
    const mockResponse = {
      data: validUser,
      status: 200,
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const response = await postUserAxios(validUser);
    expect(response.data).toEqual(validUser);
  });

  it('should reject the Promise if the API endpoint returns an error status code', async () => {
    const mockResponse = {
      data: null,
      status: 500,
      statusText: 'Internal Server Error',
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    await expect(await postUserAxios(validUser)).toEqual(mockResponse);
  });
});

describe('updateUserAxios function', () => {
  it('should update user with partial data', async () => {
    const userId = '123';
    const expectedResponse = { data: { id: userId, ...exampleCreateUser } };
    mockedAxios.patch.mockResolvedValue(expectedResponse);

    const response = await updateSingleUserAxios(userId, exampleCreateUser);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `user/${userId}`,
      exampleCreateUser,
    );
    expect(response).toEqual(expectedResponse);
  });

  it('should return error if API call fails', async () => {
    const userId = '123';
    mockedAxios.patch.mockRejectedValue(new Error('API error'));

    await expect(
      updateSingleUserAxios(userId, exampleCreateUser),
    ).rejects.toThrow('API error');
  });
});

describe('deleteUserAxios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a DELETE request to delete a user', async () => {
    const userId = '123';
    mockedAxios.patch.mockResolvedValueOnce({ data: { id: userId } });

    const result = await deleteUserAxios(userId);

    expect(axios.patch).toHaveBeenCalledWith(`user/${userId}`, {
      active: false,
    });
    expect(result).toEqual({ data: { id: userId } });
  });

  it('should throw an error if the API request fails', async () => {
    const userId = '123';
    const error = new Error('Request failed');
    mockedAxios.patch.mockRejectedValueOnce(error);

    await expect(deleteUserAxios(userId)).rejects.toEqual(error);
  });
});
