import { PaymentMethod } from './shift-type';

export type EventType = {
  id: string;
  allDay: boolean;
  color?: string;
  description: string;
  end: Date;
  start: Date;
  title: string;
  extendedProps: {
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
    hours: number;
    amount?: number;
    paid: boolean;
    paymentDate: Date | string | null;
    paymentMethod: PaymentMethod;
    commission: number;
    notes?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
};

export type ViewType =
  | 'dayGridMonth'
  | 'timeGridWeek'
  | 'timeGridDay'
  | 'listWeek';
