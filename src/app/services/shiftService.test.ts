import {
  CreateShiftType,
  CreateSummaryType,
  SummaryType,
} from 'types/shift-type';
import {
  getShiftAxios,
  postShiftAxios,
  postShiftSummaryAxios,
  deleteShiftAxios,
  updateShiftAxios,
} from './shiftService';
import axios from 'app/api/axios';
import { exampleShiftList } from 'app/features/calendar/calendarSlice.test-data';

jest.mock('app/api/axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getShiftAxios function', () => {
  let axiosGetSpy: jest.SpyInstance;

  beforeEach(() => {
    axiosGetSpy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make a GET request to the "shift" endpoint', async () => {
    await getShiftAxios();

    expect(axiosGetSpy).toHaveBeenCalledWith('shift');
  });

  it('should return an array of ShiftType objects', async () => {
    const expectedResponse = {
      data: { shifts: exampleShiftList },
    };

    axiosGetSpy.mockResolvedValueOnce(expectedResponse);

    const response = await getShiftAxios();

    expect(response).toEqual(expectedResponse);
  });
});

describe('postShiftAxios', () => {
  const validShift: CreateShiftType = {
    client: {
      id: '507f1913410c19729de860eb',
      name: 'Test client',
      email: 'testclient@email.com',
      phone: '076567453434',
      address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
    },
    cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
    date: new Date(),
    hours: 3,
    amount: 30,
    paid: false,
    paymentDate: null,
    paymentMethod: 'cash',
    commission: 0.1,
    notes: 'Some notes',
  };

  const invalidShift = {
    client: {
      id: '507f1913410c19729de860eb',
      name: 'Test client',
      email: 'testclient@email.com',
      phone: '076567453434',
      address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
    },
    cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
    date: '2022-03-19', // invalid date string
    hours: 4,
    amount: 100,
    paid: false,
    paymentDate: null,
    paymentMethod: 'cash', // invalid payment method
    commission: 10,
  };

  it('should make a successful POST request', async () => {
    const mockResponse = {
      data: validShift,
      status: 200,
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const response = await postShiftAxios(validShift);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(validShift);
  });

  it('should throw an error for an invalid shift object', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid shift object'));

    await expect(
      postShiftAxios(invalidShift as CreateShiftType),
    ).rejects.toThrow('Invalid shift object');
  });

  it('should reject the Promise for an invalid shift object', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid shift object'));

    await expect(
      postShiftAxios(invalidShift as CreateShiftType),
    ).rejects.toBeTruthy();
  });

  it('should resolve the Promise with the expected data for a valid shift object', async () => {
    const mockResponse = {
      data: validShift,
      status: 200,
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const response = await postShiftAxios(validShift);
    expect(response.data).toEqual(validShift);
  });

  it('should reject the Promise if the API endpoint returns an error status code', async () => {
    const mockResponse = {
      data: null,
      status: 500,
      statusText: 'Internal Server Error',
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    await expect(await postShiftAxios(validShift)).toEqual(mockResponse);
  });
});

describe('postShiftSummaryAxios', () => {
  const mockData: CreateSummaryType = {
    client: 'John Doe',
    cleaner: 'Jane Smith',
    from: '2022-01-01T00:00:00.000Z',
    to: '2022-01-02T00:00:00.000Z',
  };
  const mockResponse: { data: { summary: SummaryType } } = {
    data: {
      summary: {
        num: 2,
        commission: 20,
        range: '2022-01-01 - 2022-01-02',
        outstanding: 50,
        amount: 250,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should post shift summary data to the API', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    const response = await postShiftSummaryAxios(mockData);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('shift/summary', mockData);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'Failed to post shift summary';
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));
    await expect(postShiftSummaryAxios(mockData)).rejects.toThrow(errorMessage);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('shift/summary', mockData);
  });

  it('should handle date objects in the summary data', async () => {
    const mockDate = new Date('2022-01-01T00:00:00.000Z');
    const mockDataWithDate: CreateSummaryType = {
      client: 'John Doe',
      cleaner: 'Jane Smith',
      from: mockDate,
      to: mockDate,
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    const response = await postShiftSummaryAxios(mockDataWithDate);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('shift/summary', {
      client: 'John Doe',
      cleaner: 'Jane Smith',
      from: mockDate,
      to: mockDate,
    });
    expect(response).toEqual(mockResponse);
  });

  it('should handle string dates in the summary data', async () => {
    const mockDataWithDateString: CreateSummaryType = {
      client: 'John Doe',
      cleaner: 'Jane Smith',
      from: '2022-01-01T00:00:00.000Z',
      to: '2022-01-01T00:00:00.000Z',
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    const response = await postShiftSummaryAxios(mockDataWithDateString);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'shift/summary',
      mockDataWithDateString,
    );
    expect(response).toEqual(mockResponse);
  });

  it('should return summary data if API response has missing properties', async () => {
    const mockResponseWithNulls: { data: { summary: Partial<SummaryType> } } = {
      data: {
        summary: {
          num: 2,
          amount: 250,
        },
      },
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponseWithNulls);
    const response = await postShiftSummaryAxios(mockData);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('shift/summary', mockData);
    expect(response.data.summary).toEqual({
      num: 2,
      amount: 250,
    });
  });
});

describe('updateShiftAxios function', () => {
  it('should update shift with partial data', async () => {
    const shiftId = '123';
    const partialShiftData = { amount: 50 };
    const expectedResponse = { data: { id: shiftId, ...partialShiftData } };
    mockedAxios.patch.mockResolvedValue(expectedResponse);

    const response = await updateShiftAxios(shiftId, partialShiftData);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `shift/${shiftId}`,
      partialShiftData,
    );
    expect(response).toEqual(expectedResponse);
  });

  it('should return error if API call fails', async () => {
    const shiftId = '123';
    const partialShiftData = { amount: 50 };
    mockedAxios.patch.mockRejectedValue(new Error('API error'));

    await expect(updateShiftAxios(shiftId, partialShiftData)).rejects.toThrow(
      'API error',
    );
  });
});

describe('deleteShiftAxios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a DELETE request to delete a shift', async () => {
    const shiftId = '123';
    mockedAxios.delete.mockResolvedValueOnce({ data: { id: shiftId } });

    const result = await deleteShiftAxios(shiftId);

    expect(axios.delete).toHaveBeenCalledWith(`shift/${shiftId}`);
    expect(result).toEqual({ data: { id: shiftId } });
  });

  it('should throw an error if the API request fails', async () => {
    const shiftId = '123';
    const error = new Error('Request failed');
    mockedAxios.delete.mockRejectedValueOnce(error);

    await expect(deleteShiftAxios(shiftId)).rejects.toEqual(error);
  });
});
