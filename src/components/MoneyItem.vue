<template>
  <div class="centrado">
    <Icon
      class="pointer"
      @click="reduceAmount"
      icon="bi:node-minus-fill"
      :color="color"
      width="80"
      :rotate="2"
    />
    <img :src="img_src" :alt="img_src" :class="Number(value) < 1000 ? 'coin' : 'bill'">
    <Icon
      class="pointer"
      @click="increaseAmount"
      icon="bi:node-plus-fill"
      :color="color"
      width="80"
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  props: {
    color: String,
    img_src: String,
    value: Number,
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

<style scoped>
.bill {
  width: 150px;
  padding: 15px;
}

.coin {
  width: 75px;
  padding: 15px;
}
</style>
