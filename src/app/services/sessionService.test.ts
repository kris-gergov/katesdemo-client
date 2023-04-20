import { postSessionAxios, getSessionsAxios } from './sessionService';
import axios from 'app/api/axios';

jest.mock('app/api/axios');

describe('postSessionAxios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return session data when post request is successful', async () => {
    const response = {
      data: { email: 'user@example.com', password: 'password' },
    };
    (axios.post as jest.Mocked<any>).mockResolvedValue(response);

    const sessionData = await postSessionAxios({
      email: 'user@example.com',
      password: 'password',
    });

    expect(sessionData).toEqual(response);
  });

  it('should throw an error when post request fails', async () => {
    const error = new Error('Failed to post session data');
    (axios.post as jest.Mocked<any>).mockRejectedValue(error);

    await expect(
      postSessionAxios({ email: 'user@example.com', password: 'password' }),
    ).rejects.toEqual(error);
  });

  it('should make a post request to the sessions endpoint', async () => {
    const response = {
      data: { email: 'user@example.com', password: 'password' },
    };
    (axios.post as jest.Mocked<any>).mockResolvedValue(response);

    await postSessionAxios({ email: 'user@example.com', password: 'password' });

    expect(axios.post).toHaveBeenCalledWith('session', {
      email: 'user@example.com',
      password: 'password',
    });
  });

  it('should call api.post method with body of type SessionType', async () => {
    const spyPost = jest.spyOn(axios, 'post');
    const body = { email: 'user@example.com', password: 'password' };

    await postSessionAxios(body);

    expect(spyPost).toHaveBeenCalledWith('session', body);
  });
});

describe('getSessionsAxios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return session data when get request is successful', async () => {
    const response = {
      data: [{ email: 'user@example.com', password: 'password' }],
    };
    (axios.get as jest.Mocked<any>).mockResolvedValue(response);

    const sessionData = await getSessionsAxios();

    expect(sessionData).toEqual(response);
  });

  it('should throw an error when get request fails', async () => {
    const error = new Error('Failed to get session data');
    (axios.get as jest.Mocked<any>).mockRejectedValue(error);

    await expect(getSessionsAxios()).rejects.toEqual(error);
  });

  it('should make a get request to the sessions endpoint', async () => {
    const response = {
      data: [{ email: 'user@example.com', password: 'password' }],
    };
    (axios.get as jest.Mocked<any>).mockResolvedValue(response);

    await getSessionsAxios();

    expect(axios.get).toHaveBeenCalledWith('session');
  });

  it('should call api.get method with array of SessionType', async () => {
    const spyGet = jest.spyOn(axios, 'get');

    await getSessionsAxios();

    expect(spyGet).toHaveBeenCalledWith('session');
  });
});
