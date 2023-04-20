import api, { EndPoints } from 'app/api/axios';
import { SessionType } from 'types/session-type';

export async function postSessionAxios(body: SessionType) {
  return await api.post<SessionType>(EndPoints.sessions, body);
}
export async function getSessionsAxios() {
  return await api.get<SessionType[]>(EndPoints.sessions);
}
