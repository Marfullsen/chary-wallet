export default {
  toDate(dateString) {
    // dateString example could be '31-12-2021 01:02:03'
    const reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
    const [, day, month, year, hours, minutes, seconds] = reggie.exec(dateString);
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    return dateObject;
  },
};
