/**
 * 实际流程
 * 处理的是同一个对象
 */

import { MiddlewareManger } from "../middlewareManger/index";
import { MiddlewareAlias } from "../middlewareManger/interface";

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

/**
 * 判断是Json自动转换
 * @param next
 * @returns
 */
const responseMiddleware: MiddlewareAlias = (next) => async (req) => {
  console.log(req);
  const res = await next(req);

  console.log(res);
  return res;
};

httpClient.use([responseMiddleware]);

console.log(httpClient.request);

const request = httpClient.request.bind(httpClient);

export { request, httpClient };
