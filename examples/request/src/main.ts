import { request } from "..";

request("https://api.uomg.com/api/rand.music?sort=热歌榜&format=json", {
  responseType: "json",

  meta: { debug: true },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
