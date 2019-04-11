<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.col-item-wrap::-webkit-scrollbar {
  width: 4px;
}
.col-item-wrap::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #409eff;
}
.col-item-wrap::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #ededed;
}
</style>
