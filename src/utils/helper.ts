import moment from 'moment-jalaali';

export const enumerateDaysBetweenDates = (
  startDate: string,
  endDate: string,
  format: string = 'YYYY-MM-DD'
): string[] => {
  let dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.clone().format(format));
  }

  return dates;
};
