<template>
  <div id="app">
    <Button> press</Button>
    <Select :list="coinsList" v-model="check"> asfasafgsa</Select>
  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from "./components/HelloWorld.vue";
import Button from "./components/Button.vue";
import { getCoins, getMinimal } from "./api/index";
import Select from "./components/Select.vue";

export default {
  name: "App",
  data() {
    return {
      check: {
        featured: true,
        hasExternalId: false,
        image: "https://changenow.io/images/sprite/currencies/btc.svg",
        isFiat: false,
        isStable: false,
        name: "Bitcoin",
        supportsFixedRate: true,
        ticker: "btc",
      },
      coinsList: [],
    };
  },
  components: {
    HelloWorld,
    Button,
    Select,
  },
  mounted() {
    getCoins().then((data) => (this.coinsList = data));

    // .then(() => getMinimal("btc", "eth"))
    // .then((data) => (this.test = data));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
