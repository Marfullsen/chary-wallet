<template>
  <div class="nav desktop">
    <router-link to="/history"
      ><Icon icon="simple-line-icons:hourglass" width="25"
    />&nbsp;History</router-link>
    <router-link to="/"
      ><Icon icon="simple-line-icons:wallet" width="40"
    />&nbsp;Home</router-link>
    <router-link to="/recent"
      ><Icon icon="simple-line-icons:notebook" width="30"
    />&nbsp;Recent</router-link>
  </div>
  <router-view />
  <div id="nav" class="nav mobile">
    <router-link to="/history"
      ><Icon icon="simple-line-icons:hourglass" width="25"
    /></router-link>
    <router-link to="/"
      ><Icon icon="simple-line-icons:wallet" width="40"
    /></router-link>
    <router-link to="/recent"
      ><Icon icon="simple-line-icons:notebook" width="30"
    /></router-link>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  components: {
    Icon,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  display: flex;
  justify-content: space-evenly;
  padding: 15px;
  background: white;
}

.desktop {
  display: none;
}

.desktop a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.mobile {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: solid 1px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

@media (min-width: 1024px) {
  .desktop {
    display: flex;
  }
  #app {
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  }
  .mobile {
    display: none;
  }
}
</style>
