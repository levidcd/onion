/**
 * 实际流程
 * 处理的是同一个对象
 */

import { MiddlewareManger } from "@agito/onion-core";
import { Options, requestHandler } from "./middleware/requestHandler";
import { responseHandler } from "./middleware/responseHandler";
import { responseTypeHandler } from "./middleware/responseTypeHandler";
import { Req } from "@/Req";
import { Res } from "@/Res";

import { takeTimeHandler } from "./middleware/takeTimeHandler";
import { HttpClientMiddleware } from "@/types";
import { mergeHeaders } from "@/utils";

class HttpClient extends MiddlewareManger<Req, Res> {
  middleware = [
    requestHandler,
    responseTypeHandler,
    takeTimeHandler,
    responseHandler,
  ];

  use(middleware: HttpClientMiddleware | HttpClientMiddleware[]): this {
    const responseHandler = this.middleware.pop()!;
    const takeTimeHandler = this.middleware.pop()!;
    const responseTypeHandler = this.middleware.pop()!;

    this.middleware = [
      ...this.middleware,
      ...[middleware].flat(),
      responseTypeHandler,
      takeTimeHandler,
      responseHandler,
    ];

    return this;
  }

  useWrapper(middleware: HttpClientMiddleware | HttpClientMiddleware[]): this {
    this.middleware = [
      ...[...[middleware].flat()].reverse(),
      ...this.middleware,
    ];

    return this;
  }
  options: Options;
  constructor(options: Options = {}) {
    super();
    this.options = {
      ...options,
      baseURL: options.baseURL || "",
    };
  }
  request(options) {
    return this.dispatch(fetch)({
      ...this.options,
      ...options,
      headers: mergeHeaders(this.options.headers || {}, options?.headers || {}),
    });
  }

  get(url, options) {
    return this.request({ url, ...options, method: "GET" });
  }
  post(url, options) {
    return this.request({ url, ...options, method: "POST" });
  }
}

export { HttpClient };
export { HttpClientMiddleware };
export { Req, Res };
export { ResponseError } from "./constant";
