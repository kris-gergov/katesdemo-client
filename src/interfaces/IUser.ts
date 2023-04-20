export type UserType = 'client' | 'cleaner';

export default interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  address: {
    city: string;
    street: string;
    postcode: string;
  };
  deposit: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
