<template>
  <section class="container h-full m-auto px-4 md:px-5 my-16 md:my-56">
    <div class="text-5xl font-light tracking-tight md:tracking-normal">
      Crypto Exchange
    </div>
    <div class="text-xl mt-4 mb-14">Exchange fast and easy</div>
    <span v-if="loading"> Loading</span>
    <div
      class="w-full flex flex-col md:flex-row justify-end md:justify-between items-end md:items-center"
      v-else
    >
      <div class="w-full relative">
        <Select name="leftInput" :list="coinsList" v-model="check">
          <input
            type="number"
            class="w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
            v-model="valueInput"
          />
        </Select>
      </div>
      <div class="w-6 h-6 mr-2 md:mx-7 rotate-90 md:rotate-0 my-5 md:my-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.99 17H20V19H7.99V22L4 18L7.99 14V17Z" fill="#11B3FE" />
          <path d="M16.01 8H4V10H16.01V13L20 9L16.01 5V8Z" fill="#11B3FE" />
        </svg>
      </div>

      <div class="w-full relative">
        <Select name="rightInput" :list="coinsList" v-model="check2">
          <input
            type="text"
            class="w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
            disabled
            v-model="valueOutput"
          />
        </Select>
      </div>
    </div>
    <div class="text-xl mt-8 mb-2">Your Ethereum address</div>
    <div class="flex items-start flex-col md:flex-row">
      <Input
        placeholder="Enter your adress"
        class="h-12 w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
      />
      <div class="w-full w-full mt-4 md:mt-0 md:w-72 md:ml-10">
        <Button
          class="h-12 w-full bg-sky-400 text-base text-white rounded-md pl-2 uppercase flex items-center justify-center hover:bg-[#0095E0] disabled:bg-gray-300"
          :disabled="errorActive || errorMinActive"
        >
          Exchange
        </Button>
        <div
          v-show="errorActive"
          class="w-full text-center text-[#E03F3F] mt-2"
        >
          This pair is disabled now
        </div>
        <div
          v-show="errorMinActive"
          class="w-full text-center text-[#E03F3F] mt-2"
        >
          Min Amount is {{ minAmount }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import HelloWorld from "./components/HelloWorld.vue";
import Button from "./components/Button.vue";
import { getCoins, getMinimal, getCourse } from "./api/index";
import Select from "./components/Select.vue";
import vClickOutside from "v-click-outside";

export default {
  data() {
    return {
      coinsList: [],
      valueOutput: "",
      valueInput: 0,
      check: {},
      check2: {},
      minAmount: 0,
      errorActive: false,
      errorMinActive: false,
      loading: false,
    };
  },
  watch: {
    valueInput() {
      if (this.minAmount <= this.valueInput) {
        this.convert();
        this.errorMinActive = false;
      } else {
        this.valueOutput = "---";
        this.errorMinActive = true;
      }
    },
    check() {
      this.getMinAmount();
    },
    check2() {
      this.getMinAmount();
    },
  },
  mounted() {
    this.loading = true;
    getCoins().then((data) => {
      this.coinsList = data;
      this.check = data[0];
      this.check2 = data[1];
      this.getMinAmount();
      this.convert();
      this.loading = false;
    });
  },
  methods: {
    convert() {
      getCourse(this.valueInput, this.check.ticker, this.check2.ticker)
        .then((data) => {
          this.errorActive = false;
          this.valueOutput = data.estimatedAmount;
        })
        .catch((e) => {
          this.valueOutput = "---";
          this.errorActive = true;
        });
    },
    getMinAmount() {
      getMinimal(this.check.ticker, this.check2.ticker)
        .then((data) => {
          this.valueInput = data.minAmount;
          this.minAmount = data.minAmount;
          this.errorActive = false;
        })
        .catch((e) => {
          this.valueOutput = "---";
          this.errorActive = true;
        });
    },
  },
  components: {
    HelloWorld,
    Button,
    Select,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>

<style></style>
