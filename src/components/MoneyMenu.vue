<template>
  <div>
    <Icon icon="mdi:cash-remove" color="#8c114e" width="100" />
    <Icon icon="mdi:cash-plus" color="#118c4f" width="100" />
    <br>
    <money-bar :value="20000" color="#D24C29" type="bill"></money-bar>
    <money-bar :value="10000" color="#2D639F" type="bill"></money-bar>
    <money-bar :value="5000" color="#E87A87" type="bill"></money-bar>
    <money-bar :value="2000" color="#655A7A" type="bill"></money-bar>
    <money-bar :value="1000" color="#beca9a" type="bill"></money-bar>
    <money-bar :value="500" color="orange" type="coin"></money-bar>
    <money-bar :value="100" color="orange" type="coin"></money-bar>
    <money-bar :value="50" color="orange" type="coin"></money-bar>
    <money-bar :value="10" color="orange" type="coin"></money-bar>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import MoneyBar from './MoneyBar.vue';

export default {
  components: {
    Icon,
    MoneyBar,
  },
};
</script>

<style>

</style>
