export type PaymentMethod = 'cash' | 'bank';

export type GetShiftsResponse = {
  shifts: ShiftType[];
};
export type CreateShiftType = {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      postcode: string;
    };
  };
  cleaner: {
    id: string;
    name: string;
  };
  date: Date | string;
  hours: number;
  amount: number;
  paid: boolean;
  paymentDate: Date | string | null;
  paymentMethod: PaymentMethod;
  commission: number;
  notes?: string;
};

export type ShiftType = {
  _id: string;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      postcode: string;
    };
  };
  cleaner: {
    id: string;
    name: string;
  };
  date: Date | string;
  hours: number;
  amount: number;
  paid: boolean;
  paymentDate: Date | string | null;
  paymentMethod: PaymentMethod;
  commission: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type CreateSummaryType = {
  client: string;
  cleaner: string;
  from: Date | string;
  to: Date | string;
};

export type SummaryType = {
  num: number;
  commission: number;
  range: string;
  outstanding: number;
  amount: number;
};
