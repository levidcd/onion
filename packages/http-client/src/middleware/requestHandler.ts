import { IMiddleware, OverrideReqInit } from "../types";
import { Req } from "../Req";
import { Logger } from "@/utils/logger";
import { buildFullURL } from "@/utils/buildFullURL";

export const requestHandler: IMiddleware = (next) => async (_req) => {
  const req = _req as OverrideReqInit;

  const url = buildFullURL(req.baseURL, req.url, req.params);
  if (req.debug) {
    console.log(req);
  }
  return await next(new Req(req as Req, { url }));
};
