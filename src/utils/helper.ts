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
export const imageSize = (url: string, size = '180x180'): string => {
  return url.replace('#SIZEOFIMAGE#', size);
};

export const multiSort = (list: any[] | null, keys: any[] = [], desc: boolean = true) => {
  if (keys.length === 0 || list === null || list?.length === 0) {
    return list;
  }

  return list.sort((a, b) => {
    for (const i in keys) {
      if (a[keys[i]] > b[keys[i]]) {
        return desc ? -1 : 1;
      }
      if (a[keys[i]] < b[keys[i]]) {
        return desc ? 1 : -1;
      }
    }
    return 0;
  });
};
