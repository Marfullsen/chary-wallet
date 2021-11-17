<template>
  <div>
    <div class="centrado">
      <Icon icon="simple-line-icons:close" @click="cancel" color="#8c114e" width="70" />
      <label
        class="badge"
        :class="
          amount < 0
            ? 'negativeAmount'
            : amount > 0
            ? 'positiveAmount'
            : 'zeroAmount'
        "
        v-text="'$' + amount"
      ></label>
      <Icon icon="simple-line-icons:check" @click="increase" color="#118c4f" width="70" />
    </div>
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
.badge {
  padding: 8px;
  border-radius: 15px;
}

.negativeAmount {
  background: rgba(255, 99, 132, 0.2);
}
.positiveAmount {
  background: rgba(75, 192, 192, 0.2);
}
.zeroAmount {
  background: rgba(54, 162, 235, 0.2);
}
</style>
