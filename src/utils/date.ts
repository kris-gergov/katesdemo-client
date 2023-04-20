export function addHours(numOfHours: number, date = new Date()): Date {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

export function addMonths(months: number, date = new Date()): Date {
  date.setMonth(date.getMonth() + months);

  return date;
}
