import {
  Middleware,
  Next,
} from "@agito/onion-core/es/middlewareCreator/interface";
import type { Req } from "../Req";
import type { Res } from "../Res";
import { Result } from "@/utils/result";

export type IResult = {
  code: number;
  data: Record<string, any> | null | undefined;
  msg: string | null | undefined;
};

export interface IOptions extends ReqInit {
  baseURL?: string;
  params?: Record<string, any>;
}
export interface OverrideReqInit extends IOptions {
  url: string;
  body?: BodyInit;
}

export type IMiddleware = Middleware<Req, Res>;

export type IEnhanceMiddleware = Middleware<IOptions, Result>;

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
  originRequest?: ReqInit;
  debug?: boolean;
}
