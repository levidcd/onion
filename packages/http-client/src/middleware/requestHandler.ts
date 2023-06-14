import { HttpClientMiddleware, ReqInit } from "../types";
import { Req } from "../Req";
import { Logger } from "@/utils/logger";

export interface Options extends ReqInit {
  baseURL?: string;
  params?: Record<string, any>;
}
interface OverrideReqInit extends Options {
  url: string
  body?: BodyInit
}
export const requestHandler: HttpClientMiddleware = (next) => async (req) => {
  const { url } = req;
  Logger.debug(req);
  return await next(new Req(req as Req, { url }));
};
