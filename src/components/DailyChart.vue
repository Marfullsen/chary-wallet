<template>
  <div>
    <canvas id='day-chart'></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'DayBarChart',
  mounted() {
    const ctx = document.getElementById('day-chart');
    const data = {
      type: 'doughnut',
      data: {
        labels: ['Morning (Blue)', 'Afternoon (Red)', 'Evening (Yellow)', 'Night (Purple)'],
        datasets: [
          {
            label: 'Daily',
            data: [12, 19, 3, 5],
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
