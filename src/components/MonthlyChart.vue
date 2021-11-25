<template>
  <div>
    <canvas v-show="isAnyData" id='montly-chart'></canvas>
    <h2 v-show="!isAnyData">No transactions for this week</h2>
  </div>
</template>

<script>
import Chart from 'chart.js';
import formatters from '@/formatters';

export default {
  name: 'MontlyChart',
  setup() {
    return {
      ...formatters,
    };
  },
  data() {
    return {
      isAnyData: false,
      last30days: {},
    };
  },
  methods: {
    getHeaderNames() { // Placeholders of axis X.
      const today = new Date();
      const countToThirtyOne = [...Array(31).keys()]; // .map((x) => x + 1);
      countToThirtyOne.forEach((num) => {
        const daysAmount = 1000 * 60 * 60 * 24 * (30 - num);
        const xDaysAgo = new Date(today - daysAmount).toLocaleDateString();
        this.last30days[xDaysAgo] = 0;
      });
    },
    getLast30daysTransactions() {
      const persistedData = localStorage.getItem('movementsData');
      const transactions = JSON.parse(persistedData);
      let len = transactions.length;
      if (!len) return false;
      const today = new Date();
      const thirtyOneDays = 1000 * 60 * 60 * 24 * 31;
      const oneMonthAgoDate = new Date(today - thirtyOneDays).toLocaleDateString();
      const tempDate = transactions[len - 1][0];
      let counterDate = tempDate.slice(0, 10);
      while (
        new Date(this.to_YY_MM_DD__Date(counterDate))
        >= new Date(this.to_YY_MM_DD__Date(oneMonthAgoDate))) {
        /* console.log(len, this.last30days[counterDate], transactions[len - 1][2]); */
        this.last30days[counterDate] += Number(transactions[len - 1][2]);
        len -= 1;
        if (len === 0) break;
        counterDate = transactions[len - 1][0].slice(0, 10);
      }
      return true;
    },
    checkIfData(last30days) {
      const arrayOfDays = Object.entries(last30days);
      const arrayOfTransactions = Object.values(last30days);
      let zeroesRow = true;
      if ([...new Set(arrayOfTransactions)].toString() === '0') return false;
      while (zeroesRow) {
        if (arrayOfDays[0][1] === 0) {
          arrayOfDays.shift();
        } else {
          zeroesRow = false;
        }
      }
      const temp = { '': 0 };
      function addToTemp(dayNotZero) {
        // eslint-disable-next-line prefer-destructuring
        temp[dayNotZero[0]] = dayNotZero[1];
      }
      arrayOfDays.forEach((dayNotZero) => addToTemp(dayNotZero));
      this.last30days = temp;
      return true;
    },
  },
  mounted() {
    this.getHeaderNames(); // Placeholders of axis X.
    this.getLast30daysTransactions();
    this.checkIfData(this.last30days);
    this.isAnyData = [...new Set(Object.values(this.last30days))].toString() !== '0';
    const ctx = document.getElementById('montly-chart');
    const data = {
      type: 'line',
      data: {
        labels: Object.keys(this.last30days).map((x) => x.slice(0, 5)),
        // [...Array(31).keys()].map((x) => x + 1),
        datasets: [
          {
            label: 'Montly',
            data: Object.values(this.last30days),
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            // fill: false,
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
