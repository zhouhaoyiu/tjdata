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
    function makeMulti(string) {
      let l = new String(string);
      l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"));
      return l;
    }
    let string = function () {
      /*
             _______    ___     __                _____      ___     __
            |___  / |  | \ \   / /               / ____|    | \ \   / /
               / /| |__| |\ \_/ /               | (___      | |\ \_/ / 
              / / |  __  | \   /                 \___ \ _   | | \   /  
             / /__| |  | |  | |                  ____) | |__| |  | |   
            /_____|_|  |_|  |_|                 |_____/ \____/   |_|   
      */
    };

    console.log(
      "%c Auther: ",

      "color: white; background-color: #2274A5",

      `${makeMulti(string)}`,
    );
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
