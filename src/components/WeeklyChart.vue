<template>
  <div>
    <canvas v-show="!empty" id='weekly-chart'></canvas>
    <h2 v-show="empty">No transactions for this week</h2>
  </div>
</template>

<script>
import Chart from 'chart.js';
import days from '@/lookup/days';
import formatters from '@/formatters';
import styleForDays from '@/lookup/styleForDays';

export default {
  name: 'WeeklyChart',
  setup() {
    return {
      days,
      ...formatters,
    };
  },
  data() {
    return {
      empty: true,
      dayScheme: {},
    };
  },
  methods: {
    getLastSevenDaysTransactions() {
      const persistedData = localStorage.getItem('movementsData');
      const transactions = JSON.parse(persistedData);
      let len = transactions.length;
      if (!len) return false;
      const today = new Date(); // DDD MMM. dd year hh:mm:ss GMT-xxxx (time zone of the country)
      const daysAmount = 1000 * 60 * 60 * 24 * 7;
      const oneWeekAgoDate = new Date(today - daysAmount).toLocaleDateString();
      const tempDate = transactions[len - 1][0];
      let counterDate = tempDate.slice(0, 10);
      /* console.log(counterDate, this.dayScheme[counterDate], transactions[len - 1][2]); */
      if (len === 1) {
        this.dayScheme[counterDate] += Number(transactions[0][2]);
      }
      while (
        new Date(this.to_YY_MM_DD__Date(counterDate))
        >= new Date(this.to_YY_MM_DD__Date(oneWeekAgoDate))
        && len > 1) {
        /* console.log(len, counterDate,
          oneWeekAgoDate,
          today.toLocaleDateString(),
          transactions[len - 1][2]); */
        this.dayScheme[counterDate] += Number(transactions[len - 1][2]);
        len -= 1;
        counterDate = transactions[len - 1][0].slice(0, 10);
        /* console.log(counterDate, this.dayScheme[counterDate], transactions[len - 1][2]); */
      }
      return true;
      /* console.log('OUT Loop'); */
      /* console.log('NEXT ONE: ', len, counterDate, oneWeekAgoDate); */
    },
    /* calculateTransactionsOfDay(amountDaysAgo) {
      const today = new Date(); // DDD MMM. dd year hh:mm:ss GMT-xxxx (time zone of the country)
      const daysAmount = 1000 * 60 * 60 * 24 * amountDaysAgo;
      let xDaysAgo = today - daysAmount;
      const random = xDaysAgo;
      xDaysAgo = new Date(xDaysAgo);

      const dayBefore = new Date(today - 1000 * 60 * 60 * 24 * (amountDaysAgo + 1));

      const selectedDay = new Date(xDaysAgo).toLocaleDateString(); // 'dd-mm-yyyy'
      const beforeSelectedDay = new Date(dayBefore).toLocaleDateString(); // 'dd-mm-yyyy'
      console.log('fase 1', selectedDay, beforeSelectedDay);
      const persistedData = localStorage.getItem('movementsData');
      const transactions = JSON.parse(persistedData);
      const len = transactions.length;
      const searchedTransaction = transactions[len - 1][0]; // 'dd-mm-yyyy hh:mm:ss'
      const searchedTransactionDate = searchedTransaction.slice(0, 10); // 'dd-mm-yyyy'
      console.log(lastTransactionDate);
      if (today !== lastTransactionDate) {
        return 0;
      }
      console.log(random);
      let isTheDay = true;
      let index = 0;
      while (isTheDay) {
        index += 1;
        const transaction = transactions[len - index][0]; // 'dd-mm-yyyy hh:mm:ss'
        const transactionDate = transaction.slice(0, 10); // 'dd-mm-yyyy'
        const transactionTime = transaction.slice(11, 19); // 'hh:mm:ss'
        const absoluteAmount = Math.abs(transactions[len - index][2]);
        isTheDay = (today === transactionDate)
          ? this.stageByDate(transactionTime, absoluteAmount)
          : random;
      }
      console.log(random);
      return random;
    }, */
    getWeekWithTodayAsLastDay() {
      const todayDayInNumber = (new Date()).getDay();
      const [week, bgColors, borderColors] = [[], [], []];
      const countToSeven = [...Array(7).keys()];
      const todayBgColor = 'rgba(55, 255, 255, 0.2)';
      const todayBorderColor = 'rgba(55, 255, 255, 1)';
      const today = new Date();
      countToSeven.forEach((num) => {
        const nextDay = num + 1 + todayDayInNumber;
        week.push(days[nextDay]);
        bgColors.push(styleForDays[nextDay].bgColor);
        borderColors.push(styleForDays[nextDay].borderColor);

        const daysAmount = 1000 * 60 * 60 * 24 * (6 - num);
        const xDaysAgo = new Date(today - daysAmount).toLocaleDateString();
        this.dayScheme[xDaysAgo] = 0;
        /* weekStatistics.push(this.calculateTransactionsOfDay(6 - num)); */
      });

      // Highlight and rename last column to 'today'.
      week[week.length - 1] = 'Today';
      bgColors[bgColors.length - 1] = todayBgColor;
      borderColors[borderColors.length - 1] = todayBorderColor;

      return [week, bgColors, borderColors];
    },
  },
  mounted() {
    const [weekDays, bgColors, borderColors] = this.getWeekWithTodayAsLastDay();
    this.getLastSevenDaysTransactions();
    const statistics = Object.values(this.dayScheme);
    this.empty = [...new Set(statistics)].toString() === '0';
    const ctx = document.getElementById('weekly-chart');
    const data = {
      type: 'bar',
      data: {
        labels: weekDays,
        datasets: [
          {
            label: 'Weekly',
            data: statistics,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    // eslint-disable-next-line no-new
    new Chart(ctx, data);
  },
};
</script>

<style scoped>
</style>
