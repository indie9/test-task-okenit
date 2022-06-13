<template>
  <div
    class="min-h-max h-12 w-full bg-[#F6F7F8] text-base flex flex-col items-center border-[1px] border-[#E3EBEF] border-solid rounded-md box-content"
    :class="{ 'rounded-none rounded-t-md': isActive }"
    v-click-outside="hide"
  >
    <div
      class="h-12 w-full bg-[#F6F7F8] text-base rounded-md flex items-center"
    >
      <div class="h-full flex items-center w-full">
        <input
          v-show="isActive"
          type="text"
          v-bind:value="text"
          @input="changeInp"
          class="w-full bg-[#F6F7F8] text-base pl-2 flex items-center border-none outline-none"
          ref="leftInput"
          placeholder="Search"
        />
        <div v-show="!isActive" class="h-full flex items-center w-full">
          <slot></slot>
        </div>
        <div
          v-show="!isActive"
          @click="show"
          class="w-52 h-12 pl-4 pr-4 flex items-center border-l-2 border-slate-200 border-solid cursor-pointer box-content"
        >
          <img :src="selectedInput.image" alt="" height="24" width="24" />
          <span class="ml-2 text-black font-medium">
            {{ selectedInput.ticker.toUpperCase() }}
          </span>
        </div>
        <div
          class="w-[2rem] h-12 flex justify-center items-center cursor-pointer"
          @click="hide"
          v-if="isActive"
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-black w-3 h-3"
          >
            <path
              d="M10.1787 1.26318L6.00003 5.44187L1.82134 1.26318L1.26318 1.82134L5.44187 6.00003L1.26318 10.1787L1.82134 10.7369L6.00003 6.55815L10.1787 10.7369L10.7369 10.1787L6.55815 6.00003L10.7369 1.82134L10.1787 1.26318Z"
              fill="#80A2B6"
              stroke="#80A2B6"
            />
          </svg>
        </div>
        <div
          class="w-[2rem] h-12 flex justify-center items-center cursor-pointer"
          @click="show"
          v-else
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-black w-3 h-3"
          >
            <path
              d="M5.01077 5.99987C5.23471 5.99804 5.44916 5.90703 5.60872 5.74612L9.74595 1.5096C9.90811 1.34428 9.99949 1.11977 10 0.885451C10.0005 0.651135 9.91008 0.42621 9.74864 0.260157C9.5872 0.0941027 9.36795 0.000521907 9.13913 2.17641e-06C8.91031 -0.000517555 8.69066 0.0920662 8.52849 0.257385L5 3.87057L1.47151 0.257386C1.39121 0.175528 1.29595 0.110666 1.19118 0.066504C1.08641 0.0223427 0.974171 -0.000254555 0.86087 2.94837e-06C0.747568 0.000259974 0.635423 0.0233675 0.530842 0.0680047C0.426262 0.112642 0.331288 0.177935 0.25135 0.260156C0.171411 0.342378 0.108078 0.439918 0.0649512 0.547206C0.0218248 0.654494 -0.0002492 0.76943 2.12213e-06 0.885452C0.000253444 1.00147 0.0228229 1.11631 0.0664137 1.2234C0.110004 1.33049 0.17376 1.42774 0.254054 1.5096L4.39127 5.74612C4.47288 5.82845 4.56971 5.8933 4.67608 5.93687C4.78244 5.98043 4.89623 6.00185 5.01077 5.99987Z"
              fill="#80A2B6"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="z-10 w-full bg-[#F6F7F8] text-base border-[1px] border-[#E3EBEF] border-solid rounded-b-md box-content flex flex-col absolute top-12 overflow-hidden"
      v-show="isActive"
    >
      <div
        class="flex flex-row h-12 bg-[#F6F7F8]"
        v-for="(item, index) in searchList.slice(0, 5)"
        :key="`${item.name}${index}${$attrs.name}`"
      >
        <input
          class="z-0 absolute w-0 h-0 opacity-0 m-0 p-0"
          type="radio"
          :id="`${item.name}${index}${$attrs.name}`"
          :value="item"
          v-model="selectedInputModel"
        />
        <label
          :for="`${item.name}${index}${$attrs.name}`"
          @click="hide"
          class="w-full h-12 flex flex-row flex-nowrap items-center bg-[#F6F7F8] hover:bg-slate-200 cursor-pointer"
        >
          <span class="ml-5">
            <!-- <object type="image/svg+xml" :data="item.image" class="w3 h3">
              <img :src="item.image" />
            </object> -->
            <img :src="item.image" alt="" srcset="" height="24" width="24" />
          </span>
          <span class="ml-5 text-base w-28">{{
            item.ticker.toUpperCase()
          }}</span>
          <span class="mx-2 text-[#80A2B6]">{{ item.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedInput: this.selectedInputItem || {},
      isActive: false,
      text: "",
      searchList: this.list,
    };
  },
  model: {
    prop: "selectedInputItem",
    event: "change",
  },
  computed: {
    selectedInputModel: {
      get() {
        return this.selectedInput;
      },
      set(val) {
        this.text = "";
        this.selectedInput = val;
        this.$emit("change", val);
      },
    },
  },
  props: {
    list: Array,
    checked: String,

    selectedInputItem: Object,
  },
  mounted() {
    // this.selectedInput = this.checked
  },
  watch: {
    list() {
      this.searchList = [...this.list];
    },
    selectedInputItem() {
      this.selectedInput = this.selectedInputItem;
      this.hide();
    },
    text() {
      let re = new RegExp(`^${this.text}`, "i");
      this.searchList = [
        ...this.list.filter(
          (item) => item.name.match(re) || item.ticker.match(re)
        ),
      ];
    },
  },
  methods: {
    show() {
      this.text = "";
      this.isActive = true;
      this.$nextTick(() => {
        this.$refs["leftInput"].focus();
      });
    },
    hide() {
      this.isActive = false;
    },
    changeInp(e) {
      this.text = e.target.value;
    },
  },
};
</script>

<style scoped>
.inputtesting {
  display: flex;
  flex-direction: row;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}
</style>
