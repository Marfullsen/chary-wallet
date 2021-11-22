<template>
  <div>
    <canvas v-show="showChart" id='day-chart'></canvas>
    <h2 v-show="!showChart">No transactions for today</h2>
  </div>
</template>

<script>
import Chart from 'chart.js';
import formatters from '@/formatters';

export default {
  name: 'DayBarChart',
  setup() {
    const timesOfTheDay = {
      morning: {
        initial: 5,
        final: 11,
      },
      afternoon: {
        initial: 12,
        final: 17,
      },
      evening: {
        initial: 18,
        final: 24,
      },
      night: {
        initial: 0,
        final: 4,
      },
    };
    return {
      timesOfTheDay,
      ...formatters,
    };
  },
  data() {
    return {
      todayLog: {
        morning: 0,
        afternoon: 0,
        evening: 0,
        night: 0,
      },
      showChart: true,
    };
  },
  methods: {
    getTransactions(stage) {
      return this.todayLog[stage];
    },
    getTransactionsForToday() {
      return false;
    },
    stageByDate(time, amount) {
      const hr = time.slice(0, 2);
      Object.keys(this.timesOfTheDay).forEach((key) => {
        if (hr >= this.timesOfTheDay[key].initial && hr <= this.timesOfTheDay[key].final) {
          this.todayLog[key] += amount;
        }
      });
      return true;
    },
    isAnyTransactionToday() {
      const today = new Date(Date.now()).toLocaleDateString(); // 'dd-mm-yyyy'
      const persistedData = localStorage.getItem('movementsData');
      const transactions = JSON.parse(persistedData);
      const len = transactions.length;
      const lastTransaction = transactions[len - 1][0]; // 'dd-mm-yyyy hh:mm:ss'
      const lastTransactionDate = lastTransaction.slice(0, 10); // 'dd-mm-yyyy'
      if (today === lastTransactionDate) {
        let isToday = true;
        let index = 0;
        while (isToday) {
          index += 1;
          const transaction = transactions[len - index][0];
          const transactionDate = transaction.slice(0, 10); // 'dd-mm-yyyy'
          const transactionTime = transaction.slice(11, 19); // 'hh:mm:ss'
          const absoluteAmount = Math.abs(transactions[len - index][2]);
          isToday = (today === transactionDate)
            ? this.stageByDate(transactionTime, absoluteAmount)
            : false;
        }
        return true;
      }
      return false;
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    /* console.log(this.toDate('31-12-2021 01:02:03')); */
    this.showChart = this.isAnyTransactionToday();
    const ctx = document.getElementById('day-chart');
    const data = {
      type: 'doughnut',
      data: {
        labels: ['Morning (Blue)', 'Afternoon (Red)', 'Evening (Yellow)', 'Night (Purple)'],
        datasets: [
          {
            label: 'Daily',
            data: [
              this.getTransactions('morning'),
              this.getTransactions('afternoon'),
              this.getTransactions('evening'),
              this.getTransactions('night'),
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
            ],
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
