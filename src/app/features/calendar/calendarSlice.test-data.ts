import { EventType } from 'types/calendar-type';
import { CreateShiftType, ShiftType, SummaryType } from 'types/shift-type';
import { CreateUserType, UserType } from 'types/user-type';
import { addHours } from 'utils/date';

export const exampleEvent: EventType = {
  id: '507f191e810c19729de860ea',
  allDay: false,
  color: 'green',
  description: 'Test event description',
  end: addHours(4),
  start: new Date(),
  title: 'Test event',
  extendedProps: {
    client: {
      id: '507f1913410c19729de860eb',
      name: 'Test client',
      email: 'testclient@email.com',
      phone: '076567453434',
      address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
    },
    cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
    hours: 4,
    amount: 120,
    paid: false,
    paymentDate: null,
    paymentMethod: 'bank',
    commission: 100,
    notes: 'n/a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const exampleShift: ShiftType = {
  _id: '507f191e810c19729de860ea',
  date: new Date(),
  client: {
    id: '507f1913410c19729de860eb',
    name: 'Test client',
    email: 'testclient@email.com',
    phone: '076567453434',
    address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
  },
  cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
  hours: 4,
  amount: 120,
  paid: false,
  paymentDate: null,
  paymentMethod: 'bank',
  commission: 100,
  notes: 'n/a',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exampleCreateShift: CreateShiftType = {
  date: new Date(),
  client: {
    id: '507f191e810c19729de860bc',
    name: 'Test client',
    email: 'testclient@email.com',
    phone: '076567453434',
    address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
  },

  cleaner: { id: '507f191e810c19729de860dv', name: 'Test cleaner' },
  hours: 4,
  amount: 120,
  paid: false,
  paymentDate: null,
  paymentMethod: 'bank',
  commission: 100,
  notes: 'n/a',
};

export const exampleEventList: EventType[] = [
  {
    id: '507f191e810c19729de860ea',
    allDay: false,
    color: 'green',
    description: 'Test event description',
    end: addHours(4),
    start: new Date(),
    title: 'Test event',
    extendedProps: {
      client: {
        id: '507f1913410c19729de860eb',
        name: 'Test client',
        email: 'testclient@email.com',
        phone: '076567453434',
        address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
      },
      cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
      hours: 4,
      amount: 120,
      paid: false,
      paymentDate: null,
      paymentMethod: 'bank',
      commission: 100,
      notes: 'n/a',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: '507f191e810c19729de860eb',
    allDay: false,
    color: 'blue',
    description: 'Test event2 description',
    end: addHours(5),
    start: new Date(),
    title: 'Test event 2',
    extendedProps: {
      client: {
        id: '507f1913410c19729de860eb',
        name: 'Test client',
        email: 'testclient@email.com',
        phone: '076567453434',
        address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
      },
      cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
      hours: 5,
      amount: 140,
      paid: true,
      paymentDate: null,
      paymentMethod: 'cash',
      commission: 125,
      notes: 'n/a',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

export const exampleShiftList: ShiftType[] = [
  {
    _id: '507f191e810c19729de860bc',
    date: new Date(),
    client: {
      id: '507f1913410c19729de860eb',
      name: 'Test client',
      email: 'testclient@email.com',
      phone: '076567453434',
      address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
    },
    cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
    hours: 5,
    amount: 130,
    paid: false,
    paymentDate: null,
    paymentMethod: 'cash',
    commission: 110,
    notes: 'n/a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '507f191e810c19729de860dv',
    date: new Date(),
    client: {
      id: '507f1913410c19729de860eb',
      name: 'Test client',
      email: 'testclient@email.com',
      phone: '076567453434',
      address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
    },
    cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
    hours: 3,
    amount: 60,
    paid: true,
    paymentDate: new Date(),
    paymentMethod: 'bank',
    commission: 50,
    notes: 'n/a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const exampleCreateUser: CreateUserType = {
  email: 'testclient@email.com',
  name: 'Test Client',
  type: 'client',
  address: {
    city: 'Test city',
    postcode: 'S10 D5A',
    street: 'Street test',
  },
  deposit: 0,
  password: 'asdasdasd43dfs',
  phone: 1234568910,
};

export const exampleUserList: UserType[] = [
  {
    _id: '507f191e810c19729de860bc',
    email: 'testclient@email.com',
    name: 'Test Client',
    type: 'client',
    address: {
      city: 'Test city',
      postcode: 'S10 D5A',
      street: 'Street test',
    },
    deposit: 0,
    password: 'asdasdasd43dfs',
    phone: '0756345434',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '507f191e810c19729de860dv',
    email: 'testcleaner@email.com',
    name: 'Test Cleaner',
    type: 'cleaner',
    address: {
      city: 'Test city',
      postcode: 'S10 D5A',
      street: 'Street test',
    },
    deposit: 100,
    password: 'asdasdasd43dfsaSd',
    phone: '075634543453',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const exampleSummaryResults: SummaryType = {
  num: 4,
  amount: 120,
  commission: 100,
  range: '12/10/2020 - 12/12/2023',
  outstanding: 20,
};
