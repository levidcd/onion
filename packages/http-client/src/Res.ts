import { IResponseType, ResInit } from "./types";
import { isJsonBody } from "./utils";
export class Res extends Response {
  readonly responseType?: IResponseType;
  readonly meta?: Record<string, any>;
  /**
   * 对返回对象的增强
   * @param response 上一个对象
   * @param options 拓展
   */
  constructor(response: Res, options: ResInit | Response) {
    let body = (options.body ?? response.body) as BodyInit;

    const headers = new Headers(options.headers ?? response.headers);

    if (body && isJsonBody(body)) {
      try {
        body = JSON.stringify(body);
      } catch (error) {
        throw new TypeError(`Response body must be a valid JSON object.`);
      }
    }

    /**
     * 根据配置的数据生成新的Response
     */
    super(body, {
      status: options.status ?? response.status,
      statusText: options.statusText ?? response.statusText,
      headers,
    });

    this.meta = (options as ResInit).meta ?? response.meta;
    this.responseType =
      (options as ResInit).responseType ?? response.responseType;
  }
}
