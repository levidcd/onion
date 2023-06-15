import { ResponseError } from "@/constants";

type IResponseTypeError = keyof typeof ResponseError | string;

export class ResultError {
  static ErrorType = ResponseError;
  type: IResponseTypeError;
  message?: string;

  extra?: Record<string, any> = {};

  constructor(
    options: { type: IResponseTypeError; message: string } & Record<string, any>
  ) {
    const {
      type = ResponseError.UnKnownError,
      message = ResponseError.UnKnownError,
      ...other
    } = options ?? {};
    
    this.type = type;
    this.extra = other;
  }
  stringify() {
    return JSON.stringify(this);
  }
}
