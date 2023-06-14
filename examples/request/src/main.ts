import { request } from ".";

request("https://api.uomg.com/api/rand.music", {
  responseType: "json",

  meta: { debug: true },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
