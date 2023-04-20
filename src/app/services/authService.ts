import axios, { EndPoints } from 'app/api/axios';

export type UserModel = {
  email: string;
  password: string;
};

/*The return object will be an object with an access token of type string.
We're expecting an access token from the json-server-auth */
export async function loginAxios(userModel: UserModel) {
  return await axios.post<{ accessToken: string; refreshToken: string }>(
    EndPoints.sessions,
    userModel,
  );
}
