import { Result } from "@/utils/result";
import { IMiddleware } from "../types";
import { isJsonBody } from "@/utils";

export const responseTypeHandler: IMiddleware = (next) => async (req) => {

  const res = await next(req)
  if (res) {
    if (req.responseType === "json" || res.headers.get('Content-Type')?.includes('application/json')) {
      return await res['json']();
    }

    return req.responseType
      ? new Result({
          code: 0,
          data: await res[req.responseType](),
          msg: "",
          resInfo: res,
        })
      : res;
  }
};
