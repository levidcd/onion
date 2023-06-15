import { IMiddleware } from "../types";
import { Res } from "../Res";
import { ResponseError } from "../constant";
import { ResultError } from "@/utils/result";

export const responseHandler: IMiddleware = (next) => async (req) => {
  let response: Response;
  try {
    /** 只处理res */
    response = await next(req).catch((error) => {
      throw Error(error);
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(
      new ResultError({
        type: ResponseError.FetchError,
        statusText: error?.message,
      }).stringify()
    );
  }


  if (response.ok) {
    // throw new Error(`${response.status} ${response.statusText}`);
    throw new Error(
      new ResultError({
        type: ResponseError.HttpError,
        status: response.status,
        statusText: response.statusText,
        reqInfo: req,
        resInfo: response,
      }).stringify()
    );
  }

  // /** 如果是JSON处理后返回 */

  const res = new Res(response as Res, { ...req });

  return res;
};
