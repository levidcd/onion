/**
 * 实际流程
 * 处理的是同一个对象
 */

import { MiddlewareManger } from "../middlewareCreator/index";
import { MiddlewareAlias } from "../middlewareCreator/interface";
import { responseMiddleware } from "./middleware/responseMiddleware";

class HttpClient extends MiddlewareManger {
  constructor() {
    super();
  }
  request(url, config?, otherConfig?) {
    const newOptions = {};
    return this.dispatch(fetch)(url, config, otherConfig);
  }

  get(url, config?, otherConfig?) {
    return this.request(url, { ...config, method: "GET" }, otherConfig);
  }
  post(url, config?, otherConfig?) {
    return this.request(url, { ...config, method: "POST" }, otherConfig);
  }
}

const httpClient = new HttpClient();

function getContentType(contentType) {}



httpClient.use([responseMiddleware]);

console.log(httpClient.request);

const request = httpClient.request.bind(httpClient);

export { request, httpClient };
