export default {
  to_YY_MM_DD__Date(dateString) {
    const reggie = /(\d{2}).(\d{2}).(\d{4})/;
    const [, day, month, year] = reggie.exec(dateString);
    const dateObject = new Date(year, month - 1, day);
    return dateObject;
  },
};
