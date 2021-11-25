<template>
  <div>
    <h1 style="margin: 0">History</h1>
    <h2>Daily Chart</h2>
    <daily-chart/>
    <hr><hr>
    <h2>Weekly Chart</h2>
    <weekly-chart/>
    <hr><hr>
    <h2>Monthly Chart</h2>
    <monthly-chart/>
  </div>
</template>

<script>
import DailyChart from '../components/DailyChart.vue';
import MonthlyChart from '../components/MonthlyChart.vue';
import WeeklyChart from '../components/WeeklyChart.vue';

export default {
  name: 'Home',
  components: {
    DailyChart,
    WeeklyChart,
    MonthlyChart,
  },
  methods: {
    lookForPreviousData() {
      const movementsData = localStorage.getItem('movementsData');
      if (movementsData) {
        this.movements = JSON.parse(movementsData);
      } else {
        localStorage.setItem('movementsData', '[]');
      }
    },
  },
  created() {
    this.lookForPreviousData();
    document.title = 'History - Tidy Wallet';
  },
};
</script>

<style scoped>
</style>
