import isJsonBody from "../utils/isJsonBody";
import { ReqInit } from "./interface";

export class Req extends Request {
  readonly meta: any;
  /**
   * 对请求对象的增强
   * @param response 上一个对象
   * @param options 拓展
   */
  constructor(request: Req, options: ReqInit) {
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

    this.meta = { ...request.meta, ...options.meta};
  }
}
