import { yupSummaryValidation } from './yupSummaryValidation';

describe('yupSummaryValidation', () => {
  it('should validate with valid inputs', async () => {
    const input = {
      client: 'John',
      cleaner: 'Jane',
      from: new Date(),
      to: new Date(),
    };

    await expect(yupSummaryValidation.validate(input)).resolves.toBe(input);
  });

  it('should throw an error with invalid inputs', async () => {
    const input = {
      client: '',
      cleaner: '',
      from: '',
      to: '',
    };

    await expect(yupSummaryValidation.validate(input)).rejects.toThrowError();
  });
});
