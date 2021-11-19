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
  font-family: var(--global-font-family-secondary);
  border: ridge 1px black;
  border-width: 1px 0px 1px 0;
  width: 200px;
  margin: 0;
  background: white;
}
</style>
