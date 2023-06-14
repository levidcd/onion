import { HttpClientMiddleware } from "../types";
import { Req } from "../Req";
import { Logger } from "@/utils/logger";

export const requestHandler: HttpClientMiddleware = (next) => async (req) => {
  const { url } = req;
  Logger.debug(req);
  return await next(new Req(req as Req, { url }));
};
