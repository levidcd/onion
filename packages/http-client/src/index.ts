/**
 * 实际流程
 * 处理的是同一个对象
 */

import { MiddlewareManger } from "@agito/onion-core";
import { requestHandler } from "./middleware/requestHandler";
import { responseHandler } from "./middleware/responseHandler";
import { responseTypeHandler } from "./middleware/responseTypeHandler";
import { Req } from "./Req";
import { Res } from "./Res";
import { Middleware } from "./interface";

class HttpClient extends MiddlewareManger<Req, Res> {
  middleware = [responseTypeHandler, requestHandler, responseHandler];

  use(middleware: Middleware | Middleware): this {
    const responseHandler = this.middleware.pop()!;

    this.middleware = [
      ...this.middleware,
      ...[middleware].flat(),
      responseHandler,
    ];

    return this;
  }

  constructor() {
    super();
  }
  request(options) {
    return this.dispatch(fetch)(options);
  }

  get(url, options) {
    return this.request({ url, ...options, method: "GET" });
  }
  post(url, options) {
    return this.request({ url, ...options, method: "POST" });
  }
}

export { HttpClient };