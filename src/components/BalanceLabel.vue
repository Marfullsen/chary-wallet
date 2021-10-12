<template>
  <div>
    <h1>{{ balance }}</h1>
  </div>
</template>

<script>
export default {
  name: 'balanceLabel',
  data() {
    return {
      balance: this.$balanceGlobal,
    };
  },
};
</script>

<style scoped>

</style>
