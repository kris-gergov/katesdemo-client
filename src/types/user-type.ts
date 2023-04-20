export type UserType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  type: string;
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  deposit: number;
  phone: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type CreateUserType = {
  email: string;
  password: string;
  name: string;
  type: 'cleaner' | 'client';
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  deposit: number;
  phone: number;
};
