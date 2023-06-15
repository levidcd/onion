/**
 * Http状态错误
 */
export const HttpError = "HttpError";
/**
 * 请求过程中报错
 */
export const FetchError = "FetchError";
/**
 * 请求过程中报错
 */
export const TimeoutError = "TimeoutError";
/**
 * 请求过程中报错
 */
export const UnKnownError = "UnKnownError";

export const ResponseError = {
  /**
   * Http状态错误
   */
  HttpError,
  /**
   * 请求过程中报错
   */
  FetchError,
  /**
   * 超时取消
   */
  TimeoutError,
  /**
   * 未知错误
   */
  UnKnownError,
};

/** 全局下载进度 */
export const ON_GLOBAL_DOWNLOAD_PROGRESS = Symbol(
  "ON_GLOBAL_DOWNLOAD_PROGRESS"
);
/** 取消请求常量 */
export const ABORT_CONTROLLER = Symbol("ABORT_CONTROLLER");
