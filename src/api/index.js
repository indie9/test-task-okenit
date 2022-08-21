const axios = require("axios").default;
const inst = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export function getPosts(userId) {
  if (userId) {
    return inst
      .get(`posts?userId=${userId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return inst
      .get(`posts`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function getUsers(id) {
  console.log(id);
  if (id) {
    return inst
      .get(`users/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return inst
      .get("users")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function getComment(postId) {
  return inst
    .get(`comments?postId=${postId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postComment(dto) {
  return inst
    .post(`comments`, dto)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
