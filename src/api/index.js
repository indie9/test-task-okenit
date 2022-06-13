const axios = require("axios").default;
const inst = axios.create({
  baseURL: "https://api.changenow.io/v1",
});

export function getCoins() {
  return inst
    .get("/currencies")
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
export function getMinimal(first, second) {
  return inst
    .get(
      `/min-amount/${first}_${second}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd&useRateId=true`
    )
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
export function getCourse(amount, first, second) {
  return inst
    .get(
      `/exchange-amount/${amount}/${first}_${second}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd&useRateId=true`
    )
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// export default {
//   getCoins: getCoins(),
//   getMinimal: getMinimal(),
// };
