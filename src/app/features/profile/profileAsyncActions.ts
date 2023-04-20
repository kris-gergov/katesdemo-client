import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileActionTypes } from './profileActionTypes';
import { getSingleUserAxios } from 'app/services/userService';

export const getProfileAction = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id: string) => {
    return (await getSingleUserAxios(id)).data;
  },
);
/* 
export const putProfileAction = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async (user: CreateUserType) => {
    return (await updateSingleUserAxios(user._id, user)).data;
  },
); */
