<template>
  <div class="h-12 w-full bg-[#F6F7F8] text-base rounded-md flex items-center">
    <div class="h-full flex items-center w-full" @click="show">
      {{ selectedInputModel.name }}
    </div>
    <div
      class="z-10 w-full bg-[#F6F7F8] text-base border-[1px] border-[#E3EBEF] border-solid rounded-b-md box-content flex flex-col absolute top-12 overflow-y-auto max-h-60"
      v-show="isActive"
    >
      <div
        class="flex flex-row h-12 bg-[#F6F7F8]"
        v-for="(item, index) in valueList"
        :key="`${index}`"
      >
        <input
          class="z-0 absolute w-0 h-0 opacity-0 m-0 p-0"
          type="radio"
          :id="`${item.id}${index}`"
          :value="item"
          v-model="selectedInputModel"
        />
        <label
          :for="`${item.id}${index}`"
          @click="hide"
          class="w-full h-12 flex flex-row flex-nowrap items-center bg-[#F6F7F8] hover:bg-slate-200 cursor-pointer"
        >
          <span class="mx-2 text-[#80A2B6] whitespace-nowrap overflow-hidden">
            {{ item.name }}</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    checked: String,

    selectedInputItem: Object,
  },
  data() {
    return {
      isActive: false,
      selectedInputModel: {},
    };
  },
  model: {},
  computed: {
    listValue() {
      return Object.values(this.list);
    },
    valueList() {
      return [{ name: "All users", id: null }].concat(this.list);
    },
  },
  mounted() {},
  watch: {
    selectedInputModel() {
      this.$emit("userCheck", this.selectedInputModel);
    },
  },
  methods: {
    show() {
      this.isActive = true;
    },
    hide() {
      this.isActive = false;
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
