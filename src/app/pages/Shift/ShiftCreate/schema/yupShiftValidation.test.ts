import { yupShiftValidation } from './yupShiftValidation';

describe('yupShiftValidation', () => {
  test('valid shift object should pass validation', async () => {
    const validShift = {
      client: {
        id: '507f1913410c19729de860eb',
        name: 'Test client',
        email: 'testclient@email.com',
        phone: '076567453434',
        address: { street: 'Street', city: 'City', postcode: 'ABC 123' },
      },
      cleaner: { id: '507f1913410c19729de860eb', name: 'Test cleaner' },
      date: new Date(),
      hours: 3,
      amount: 30,
      paid: false,
      paymentDate: null,
      paymentMethod: 'cash',
      commission: 0.1,
      notes: 'Some notes',
    };

    await expect(yupShiftValidation.isValid(validShift)).resolves.toBe(true);
  });

  test('missing client should fail validation', async () => {
    const invalidShift = {
      cleaner: 'cleaner name',
      date: new Date(),
      hours: 3,
      amount: 50,
      paid: false,
      paymentDate: null,
      paymentMethod: 'cash',
      commission: 5,
      notes: 'some notes',
    };

    await expect(yupShiftValidation.isValid(invalidShift)).resolves.toBe(false);
  });

  test('negative hours should fail validation', async () => {
    const invalidShift = {
      client: 'client name',
      cleaner: 'cleaner name',
      date: new Date(),
      hours: -3,
      amount: 50,
      paid: false,
      paymentDate: null,
      paymentMethod: 'cash',
      commission: 5,
      notes: 'some notes',
    };

    await expect(yupShiftValidation.isValid(invalidShift)).resolves.toBe(false);
  });

  test('negative amount should fail validation', async () => {
    const invalidShift = {
      client: 'client name',
      cleaner: 'cleaner name',
      date: new Date(),
      hours: 3,
      amount: -50,
      paid: false,
      paymentDate: null,
      paymentMethod: 'cash',
      commission: 5,
      notes: 'some notes',
    };

    await expect(yupShiftValidation.isValid(invalidShift)).resolves.toBe(false);
  });

  test('invalid payment method should fail validation', async () => {
    const invalidShift = {
      client: 'client name',
      cleaner: 'cleaner name',
      date: new Date(),
      hours: 3,
      amount: 50,
      paid: false,
      paymentDate: null,
      paymentMethod: 'invalid',
      commission: 5,
      notes: 'some notes',
    };

    await expect(yupShiftValidation.isValid(invalidShift)).resolves.toBe(false);
  });
});
