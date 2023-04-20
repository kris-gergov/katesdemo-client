import api, { EndPoints } from '../api/axios';
import { CreateUserType, UserType } from '../../types/user-type';

type GetUsersResponse = {
  users: UserType[];
};

export async function getUsersAxios() {
  return await api.get<GetUsersResponse>(EndPoints.users);
}

export async function postUserAxios(user: CreateUserType) {
  return await api.post<UserType>(EndPoints.users, user);
}

export async function deleteUserAxios(userId: string) {
  return await api.patch<UserType>(`${EndPoints.users}/${userId}`, {
    active: false,
  });
}

export async function getSingleUserAxios(userId: string) {
  return await api.get<UserType>(`${EndPoints.users}/${userId}`);
}

export async function updateSingleUserAxios(
  userId: string,
  data: Omit<CreateUserType, 'email'>,
) {
  return await api.patch<UserType>(`${EndPoints.users}/${userId}`, data);
}
