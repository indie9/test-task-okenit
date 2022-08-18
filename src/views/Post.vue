<template>
  <div>
    <router-link to="/">go back</router-link>
    <div>
      <div>{{ post.id }}</div>
      <!-- <div>{{ userNameEnum[post.userId] }}</div> -->
      <div>{{ post.title }}</div>
      <div>{{ post.body }}</div>
    </div>
    <div v-for="(comment, index) in commentList" :key="index">
      <div>{{ comment.email }}</div>
      <!-- <div>{{ userNameEnum[post.userId] }}</div> -->
      <div>{{ comment.name }}</div>
      <div>{{ comment.body }}</div>
    </div>
    <input
      type="text"
      v-model="comentName"
      class="h-12 w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
    />
    <textarea
      v-model="comentBody"
      class="h-12 w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
    />
    <Button @click="posting">send</Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getComment, postComment } from "../api/index";
import Input from "@/components/Input.vue";

export default {
  components: { Button, Input },
  name: "Post",
  data() {
    return {
      commentList: [],
      comentName: "",
      comentBody: "",
    };
  },

  computed: {},
  props: {
    post: Object,
    user: String,
  },
  mounted() {
    this.fetchComents();
  },
  watch: {},
  methods: {
    fetchComents() {
      return getComment(this.post.id).then((data) => {
        this.commentList = data;
      });
    },
    posting() {
      let dto = {
        postId: this.post.id,
        name: this.comentName,
        body: this.comentBame,
      };
      this.comentName = "";
      this.comentBody = "";
      return postComment(dto).then(() => this.fetchComents());
    },
  },
};
</script>

<style scoped></style>
