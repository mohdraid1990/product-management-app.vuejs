<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  nav {
    padding: 20px;

    a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
      margin: 0 10px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
