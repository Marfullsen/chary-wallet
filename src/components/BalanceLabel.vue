<template>
  <div class="centrado">
    <h1 class="title">${{ (Number(balance)).toLocaleString('es-cl') }}</h1>
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
.title {
  border: solid 1px black;
  width: 200px;
  margin: 0;
}
</style>
