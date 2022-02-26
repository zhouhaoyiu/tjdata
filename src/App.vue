<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "app",
  methods: {},
  mounted() {
    if (!localStorage.getItem("date")) {
      localStorage.setItem("date", dayjs("2022-01-01").unix());
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
