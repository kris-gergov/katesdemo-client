import api from 'app/api/axios';
import { CreateShiftType, ShiftType } from 'types/shift-type';

type GetShiftsResponse = {
  shifts: ShiftType[];
};

type CreateSummaryType = {
  client: string;
  cleaner: string;
  from: Date | string;
  to: Date | string;
};

type SummaryType = {
  num: number;
  commission: number;
  range: string;
  outstanding: number;
  amount: number;
};

const EndPoints = {
  shifts: 'shift',
  sessions: 'session',
  login: 'login',
  users: 'user',
};

export async function getShiftAxios() {
  return await api.get<GetShiftsResponse>(EndPoints.shifts);
}

export async function postShiftAxios(shift: CreateShiftType) {
  return await api.post<CreateShiftType>(EndPoints.shifts, shift);
}

export async function postShiftSummaryAxios(data: CreateSummaryType) {
  return await api.post<{ summary: SummaryType }>(
    `${EndPoints.shifts}/summary`,
    data,
  );
}

export async function updateShiftAxios(
  shiftId: string,
  shift: Partial<CreateShiftType>,
) {
  return await api.patch(`${EndPoints.shifts}/${shiftId}`, shift);
}

export async function deleteShiftAxios(shiftId: string) {
  return await api.delete(`${EndPoints.shifts}/${shiftId}`);
}
