import dayjs from 'dayjs';

export const shortDate = (
  date: string | Date,
  format: string = 'DD-MMMM-YYYY'
): string => {
  return dayjs(date).format(format);
};

export const longDate = (
  date: string | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string => {
  return dayjs(date).format(format);
};
