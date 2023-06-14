import type { Req } from "../Req";
import type { Res } from "../Res";

export type HttpClientNext = (res: Req) => Promise<Res>;
export type HttpClientMiddleware = (
  next: HttpClientNext
) => (res: Req) => Promise<Res>;



export type IResponseType =
  | "json"
  | "arrayBuffer"
  | "blob"
  | "formData"
  | "text"
  | null
  | false;

/**
 * 拓展默认的 ResponseInit 类型
 * @host https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response
 */
export interface ResInit extends ResponseInit {
  responseType?: IResponseType;
  meta?: Record<string, any>;
  body?: BodyInit | Record<string, any> | null;
}

/**
 * 拓展默认的 RequestInit 类型
 * @host https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request
 */
export interface ReqInit extends Omit<RequestInit, "body"> {
  url?: string;
  responseType?: IResponseType;
  meta?: Record<string, any>;
  body?: BodyInit | Record<string, any>;
  originRequest?: any;
}
