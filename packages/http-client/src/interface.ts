import { Req } from "./Req";
import { Res } from "./Res";

export type Next = (res: Req) => Promise<Res>;
export type Middleware = (next: Next) => (res: Req) => Promise<Res>;
export type MiddlewareAlias = (next: Next) => Next;

/**
 * 拓展默认的 ResponseInit 类型
 * @host https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response
 */
export interface ResInit extends ResponseInit {
  body?: BodyInit;
}

/**
 * 拓展默认的 RequestInit 类型
 * @host https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request
 */
export interface ReqInit extends RequestInit {
  url: string;
  responseType?: "json" | string;
  meta?: any;
  _options?: any;
}
