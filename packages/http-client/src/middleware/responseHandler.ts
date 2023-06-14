import { HttpClientMiddleware } from "../types";
import { Res } from "../Res";
import { ResponseError } from "../constant";

export const responseHandler: HttpClientMiddleware = (next) => async (req) => {
  try {
    /** 只处理res */
    const response: Response = await next(req).catch((error) => {
      throw Error(error);
    });

    if (!response.ok) {
      // throw new Error(`${response.status} ${response.statusText}`);
      throw new Error(
        JSON.stringify({
          type: ResponseError.HttpError,
          status: response.status,
          statusText: response.statusText,
          reqInfo: req,
          resInfo: response,
        })
      );
    }

    // /** 如果是JSON处理后返回 */

    const res = new Res(response as Res, { ...req });

    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      JSON.stringify({
        type: ResponseError.FetchError,
        statusText: error?.message,
      })
    );
  }
};
