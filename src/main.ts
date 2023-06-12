import { request } from "./request";

request("https://api.uomg.com/api/rand.music?sort=热歌榜&format=json", {
  responseType: "json",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
