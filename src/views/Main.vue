<template>
  <section class="container h-full m-auto px-4 md:px-5 my-16">
    <div class="flex items-center">
      <div class="ml-1 font-bold mr-4">Show post by</div>
      <UserSelect :list="userList" @userCheck="userCheck" />
    </div>
    <div
      v-for="post in postList"
      :key="post.id"
      class="my-16 p-4 bg-[#F0F0F0] rounded-md"
    >
      <div class="font-extrabold">{{ post.title }}</div>
      <div class="py-2">{{ post.body }}</div>
      <div class="flex juctify-between">
        Post by
        <div class="ml-1 font-bold">{{ userNameEnum[post.userId] }}</div>
        <router-link
          :to="{
            name: 'Post',
            params: { post: post, userId: String(post.userId) },
          }"
          class="ml-auto"
        >
          <button class="text-sky-800">Читать далее</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { getPosts, getUsers } from "../api/index";
import UserSelect from "../components/UserSelect.vue";
import vClickOutside from "v-click-outside";
import Button from "@/components/Button.vue";

export default {
  name: "Main",
  data() {
    return {
      loading: false,
      postList: [],
      userList: [],
      checkUser: null,
      userNameEnum: {},
    };
  },
  watch: {},

  computed: {
    userName() {
      return "anonim";
    },
  },
  methods: {
    userCheck(val) {
      this.checkUser = val;
      this.fetchPosts(val.id);
    },
    fetchUsers() {
      return getUsers().then((data) => {
        this.userList = data;
        data.map((item) => (this.userNameEnum[item.id] = item.name));
      });
    },
    fetchPosts(userId) {
      return getPosts(userId).then((data) => {
        this.postList = data;
      });
    },
    userFind() {
      return this.users.fil;
    },
  },
  mounted() {
    this.loading = true;
    this.fetchUsers().then(() => {
      this.fetchPosts().finally(() => {
        this.loading = false;
      });
    });
  },
  components: {
    UserSelect,
    Button,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
<style></style>
