<template>
  <input type="text" :placeholder="placeholder" v-model="contentModel" />
</template>

<script>
export default {
  data() {
    return {
      content: this.value,
    };
  },
  computed: {
    contentModel: {
      get() {
        return this.content;
      },
      set(val) {
        this.content = val;
        this.$emit("input", val);
      },
    },
  },
  props: {
    placeholder: String,
    value: String,
  },
  watch: {
    value() {
      this.content = this.value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
