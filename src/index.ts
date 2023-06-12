import { request } from "./httpClient/index";

request("https://api.uomg.com/api/rand.qinghua")
  .then((res) => {
    const result = res.json();
    console.log(result);
    return result;
  })
  .then((res) => {
    console.log(res);
  });
