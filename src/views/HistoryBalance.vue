<template>
  <div>
    <h1 style="margin: 0">History</h1>
    <daily-chart/>
    <weekly-chart/>
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
};
</script>

<style scoped>
</style>
