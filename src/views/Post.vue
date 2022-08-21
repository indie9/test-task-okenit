<template>
  <div class="container h-full m-auto px-4 md:px-5 my-16">
    <router-link to="/">
      <Button
        class="h-8 w-20 bg-sky-400 text-white rounded-md flex items-center justify-center hover:bg-[#0095E0] disabled:bg-gray-300"
      >
        Back
      </Button></router-link
    >
    <div>
      <!-- <div>{{ userNameEnum[post.userId] }}</div> -->
      <div class="font-extrabold text-xl">{{ post.title }}</div>
      <div class="py-2">{{ post.body }}</div>
      <div class="" v-if="userInfo">
        Autor info:
        <div class="ml-1 font-bold">
          Name: <span class="font-normal">{{ userInfo.name }}</span>
        </div>
        <div class="ml-1 font-bold">
          Email: <span class="font-normal">{{ userInfo.email }}</span>
        </div>
        <div class="ml-1 font-bold">
          Address:
          <span class="font-normal">{{
            userInfo.address.city +
            userInfo.address.suite +
            userInfo.address.street
          }}</span>
        </div>
        <div class="ml-1 font-bold">
          Phone: <span class="font-normal">{{ userInfo.phone }}</span>
        </div>
        <div class="ml-1 font-bold">
          Website: <span class="font-normal">{{ userInfo.website }}</span>
        </div>
        <div class="ml-1 font-bold">
          Company: <span class="font-normal">{{ userInfo.company.name }}</span>
        </div>
      </div>
    </div>
    <div class="my-4 font-bold text-xl">Comments</div>
    <div
      v-for="(comment, index) in commentList"
      :key="index"
      class="my-2 p-4 bg-[#F0F0F0] rounded-md"
    >
      <div class="font-bold">{{ comment.email }}</div>

      <div class="py-2 font-bold">{{ comment.name }}</div>
      <div>{{ comment.body }}</div>
    </div>
    <div class="my-4 font-bold text-l">Send comment</div>
    <div class="my-4 font-bold">Title</div>
    <input
      type="text"
      v-model="comentName"
      class="h-12 w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
    />
    <div class="my-4 font-bold">Your comment</div>
    <textarea
      v-model="comentBody"
      class="h-32 w-full bg-[#F6F7F8] text-base rounded-md pl-2 flex items-center border-none outline-none"
    />
    <Button
      @click="posting"
      class="h-8 w-full mt-8 bg-sky-400 text-white rounded-md flex items-center justify-center hover:bg-[#0095E0] disabled:bg-gray-300"
      >Send</Button
    >
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getComment, postComment, getUsers } from "../api/index";

export default {
  components: { Button },
  name: "Post",
  data() {
    return {
      userInfo: null,
      commentList: [],
      comentName: "",
      comentBody: "",
    };
  },

  computed: {},
  props: {
    post: Object,
    userId: String,
  },
  mounted() {
    this.fetchComents();
    this.fetchUser();
  },
  watch: {},
  methods: {
    fetchComents() {
      return getComment(this.post.id).then((data) => {
        this.commentList = data;
      });
    },
    fetchUser() {
      return getUsers(this.userId).then((data) => {
        this.userInfo = data;
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
