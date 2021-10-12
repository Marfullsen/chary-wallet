<template>
  <div>
    <h1>Balance</h1>
    <balance-label></balance-label>
    <br>
    <money-menu></money-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import BalanceLabel from '@/components/BalanceLabel.vue';
import MoneyMenu from '../components/MoneyMenu.vue';

export default {
  name: 'Home',
  components: {
    BalanceLabel,
    MoneyMenu,
  },
};
</script>
