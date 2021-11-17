<template>
  <div class="centrado">
    <Icon
      v-if="type === 'bill'"
      @click="reduceAmount"
      icon="mdi:cash"
      :color="color"
      width="80"
    />
    <Icon
      v-else
      @click="reduceAmount"
      icon="jam:coin"
      :color="color"
      width="50"
    />
    <label v-text="'$' + value"></label>
    <Icon
      v-if="type === 'bill'"
      @click="increaseAmount"
      icon="mdi:cash"
      :color="color"
      width="80"
    />
    <Icon
      v-else
      @click="increaseAmount"
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
      amount: this.$amount,
    };
  },
  methods: {
    reduceAmount() {
      this.amount -= this.value;
    },
    increaseAmount() {
      this.amount += this.value;
    },
  },
};
</script>

<style>
.centrado {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
