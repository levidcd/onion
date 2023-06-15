import { Result } from "@/utils/result";
import { IMiddleware } from "../types";
import { isJsonBody } from "@/utils";

export const responseTypeHandler: IMiddleware = (next) => async (req) => {

  const res = await next(req)
  if (res) {

    if (isJsonBody(res)) {
      return res
    }

    if (req.responseType === "json") {
      debugger
      return await res[req.responseType]();
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
