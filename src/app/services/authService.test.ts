import { loginAxios, UserModel } from './authService';
import axios from 'app/api/axios';

jest.mock('app/api/axios');

describe('loginAxios', () => {
  const userModel: UserModel = {
    email: 'test@test.com',
    password: 'test123',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call axios.post with the correct arguments', async () => {
    const axiosPostSpy = jest.spyOn(axios, 'post');
    const expectedUrl = 'session';
    await loginAxios(userModel);
    expect(axiosPostSpy).toHaveBeenCalledWith(expectedUrl, userModel);
  });

  it('should return an object with an accessToken and refreshToken properties', async () => {
    const mockResponse = {
      data: {
        accessToken: '12345',
        refreshToken: '67890',
      },
    };
    jest.spyOn(axios, 'post').mockResolvedValue(mockResponse);
    const result = await loginAxios(userModel);
    expect(result.data).toHaveProperty('accessToken');
    expect(result.data).toHaveProperty('refreshToken');
  });

  it('should throw an error if axios.post throws an error', async () => {
    const errorMessage = 'Network error';
    jest.spyOn(axios, 'post').mockRejectedValue(new Error(errorMessage));
    await expect(loginAxios(userModel)).rejects.toThrow(errorMessage);
  });

  it('should return a valid accessToken and refreshToken', async () => {
    const mockResponse = {
      data: {
        accessToken: '12345',
        refreshToken: '67890',
      },
    };
    jest.spyOn(axios, 'post').mockResolvedValue(mockResponse);
    const result = await loginAxios(userModel);
    expect(typeof result.data.accessToken).toBe('string');
    expect(typeof result.data.refreshToken).toBe('string');
    expect(result.data.accessToken).toHaveLength(5);
    expect(result.data.refreshToken).toHaveLength(5);
  });
});
