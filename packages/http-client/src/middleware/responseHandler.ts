import { IMiddleware } from "../types";
import { Res } from "../Res";
import { ResponseError } from "../constants";
import { ResultError } from "@/utils/result";

export const responseHandler: IMiddleware = (next) => async (req) => {
  let response: Response;
  try {
    /** 只处理res */
    response = await next(req).catch((error) => {
      throw error;
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(
      new ResultError({
        type: ResponseError.FetchError,
        request: req,
        message: error.message,
      }).stringify()
    );
  }

  if (!response.ok) {
    throw new Error(
      new ResultError({
        type: ResponseError.HttpError,
        request: req,
        response: response,
        message: ResponseError.HttpError,
      }).stringify()
    );
  }

  // /** 如果是JSON处理后返回 */

  return new Res(response as Res, { ...req });
};
