<template>
  <div class="centrado">
    <Icon
      v-if="type === 'bill'"
      @click="reduceBalance"
      icon="mdi:cash"
      :color="color"
      width="80"
    />
    <Icon
      v-else
      @click="reduceBalance"
      icon="jam:coin"
      :color="color"
      width="50"
    />
    <label v-text="'$' + value"></label>
    <Icon
      v-if="type === 'bill'"
      @click="increaseBalance"
      icon="mdi:cash"
      :color="color"
      width="80"
    />
    <Icon
      v-else
      @click="increaseBalance"
      icon="jam:coin"
      :color="color"
      width="50"
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  props: {
    color: String,
    value: Number,
    type: String,
  },
  components: {
    Icon,
  },
  data() {
    return {
      balance: this.$balanceGlobal,
    };
  },
  methods: {
    reduceBalance() {
      this.balance -= this.value;
    },
    increaseBalance() {
      this.balance += this.value;
    },
  },
};
</script>

<style>
.centrado {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
