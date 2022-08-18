<template>
  <section class="container h-full m-auto px-4 md:px-5 my-16 md:my-56">
    <UserSelect :list="userList" @userCheck="userCheck" />
    <div v-for="post in postList" :key="post.id" class="post">
      <router-link
        :to="{
          name: 'Post',
          params: { post: post, use: userNameEnum[post.userId] },
        }"
      >
        <div>{{ post.id }}</div>
        <div>{{ userNameEnum[post.userId] }}</div>
        <div>{{ post.title }}</div>
        <div>{{ post.body }}</div>
      </router-link>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { getPosts, getUsers } from "../api/index";
import UserSelect from "../components/UserSelect.vue";
import vClickOutside from "v-click-outside";

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
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
<style>
.post {
  margin-top: 20px;
}
</style>
