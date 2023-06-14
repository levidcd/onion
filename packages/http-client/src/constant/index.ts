/**
 * Http状态错误
 */
export const HttpError = "HttpError";
/**
 * 请求过程中报错
 */
export const FetchError = "FetchError";

export const ResponseError = {
  /**
   * Http状态错误
   */
  HttpError,
  /**
   * 请求过程中报错
   */
  FetchError,
};

export type IResponseError = typeof HttpError | typeof ResponseError | "string";
