import { isJsonBody } from "./utils";
import type { IResponseType, ReqInit } from "./types";

export class Req extends Request {
  readonly meta?: Record<string, any>;
  readonly responseType?: IResponseType;
  readonly originRequest: Record<string, any>;
  readonly debug: boolean;
  /**
   * 对请求对象的增强
   * @param response 上一个对象
   * @param options 拓展
   */
  constructor(request: Req, options: ReqInit | Request) {
    let body = (options.body ?? request.body) as BodyInit;

    const headers = new Headers(options.headers ?? request.headers);

    if (body && isJsonBody(body)) {
      headers.set("Content-Type", "application/json");
      try {
        body = JSON.stringify(body);
      } catch (error) {
        throw new TypeError(`Response body must be a valid JSON object.`);
      }
    }

    if (
      (globalThis.FormData && body instanceof FormData) ||
      body instanceof URLSearchParams
    ) {
      headers.delete("Content-Type");
    }

    /**
     * 根据配置的数据生成新的Response
     */
    super(new Request(options.url ?? request.url), {
      method: options.method ?? request.method,
      headers,
      body: body ?? request.body,
      mode: options.mode ?? request.mode,
    });
    this.meta = (options as ReqInit).meta ?? request.meta;
    this.responseType =
      (options as ReqInit).responseType ?? request.responseType;
    this.originRequest = request;
    this.debug = (options as ReqInit).debug ?? request.debug;
  }
}
