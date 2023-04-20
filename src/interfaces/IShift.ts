export type PaymentMethod = 'cash' | 'bank';

export default interface IShift {
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
  amount?: number;
  paid: boolean;
  paymentDate: Date | string | null;
  paymentMethod: PaymentMethod;
  commission: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
