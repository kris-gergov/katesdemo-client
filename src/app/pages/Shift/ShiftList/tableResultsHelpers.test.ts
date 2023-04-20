import { applyFilters } from './tableResultsHelpers';
import { exampleShiftList } from 'app/features/calendar/calendarSlice.test-data';

describe('Table filter function', () => {
  it('filters by payment method correctly', async () => {
    const newShifts = applyFilters(exampleShiftList, { paymentMethod: 'bank' });
    for (const shift of newShifts) {
      expect(shift.paymentMethod).toEqual('bank');
    }
  });

  it('filters by non-paid shifts correctly', async () => {
    const newShifts = applyFilters(exampleShiftList, { paid: true });
    for (const shift of newShifts) {
      expect(shift.paid).toBeFalsy();
    }
  });
});
