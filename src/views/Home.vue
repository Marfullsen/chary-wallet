<template>
  <div>
    <money-menu></money-menu>
  </div>
</template>

<script>
import MoneyMenu from '../components/MoneyMenu.vue';

export default {
  name: 'Home',
  components: {
    MoneyMenu,
  },
  created() {
    document.title = 'Home - Tidy Wallet';
  },
};
</script>
