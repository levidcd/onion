/**
 * 实际流程
 * 处理的是同一个对象
 */

import { MiddlewareManger } from "@agito/onion-core";
import { requestHandler } from "./middleware/requestHandler";
import { responseHandler } from "./middleware/responseHandler";
import { responseTypeHandler } from "./middleware/responseTypeHandler";
import { Req } from "@/Req";
import { Res } from "@/Res";

import { takeTimeHandler } from "./middleware/takeTimeHandler";
import { IMiddleware, IEnhanceMiddleware, IOptions } from "@/types";
import { mergeHeaders } from "@/utils";
import { Result, ResultError } from "./utils/result";

class HttpClient extends MiddlewareManger<Req, Res> {
  middleware = [
    requestHandler,
    responseTypeHandler,
    takeTimeHandler,
    responseHandler,
  ];

  use(middleware: IMiddleware | IMiddleware[]): this {
    const responseHandler = this.middleware.pop()!;
    const takeTimeHandler = this.middleware.pop()!;
    // const responseTypeHandler = this.middleware.pop()!;

    this.middleware = [
      ...this.middleware,
      ...[middleware].flat(),
      // responseTypeHandler,
      takeTimeHandler,
      responseHandler,
    ];

    return this;
  }

  useEnhance(middleware: IEnhanceMiddleware | IEnhanceMiddleware[]): this {
    this.middleware = [
      ...[...[middleware].flat()].reverse(),
      ...this.middleware,
    ] as IMiddleware[];

    return this;
  }

  /**
   * 请求配置
   */
  options: IOptions;

  /**
   * 初始化配置
   * @param options
   */
  constructor(options: IOptions = {}) {
    super();
    this.options = {
      ...options,
      baseURL: options.baseURL || "",
    };
  }
  request<T = Res>(options: IOptions): Promise<T> {
    return this.dispatch(fetch)({
      ...this.options,
      ...options,
      headers: mergeHeaders(
        this.options.headers || {},
        options?.headers || {}
      ) as Headers,
    } as unknown as Req) as unknown as Promise<T>;
  }

  get(url, options) {
    return this.request({ url, ...options, method: "GET" });
  }
  post(url, options) {
    return this.request({ url, ...options, method: "POST" });
  }
}

export { HttpClient };
export { IMiddleware, IEnhanceMiddleware };
export { Req, Res };
export { ResponseError } from "./constant";
export { Result, ResultError };
