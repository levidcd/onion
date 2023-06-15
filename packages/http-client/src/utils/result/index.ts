import { IResult } from "@/types";

export class Result implements IResult {
  code: number;
  data: Record<string, any> | null | undefined;
  msg: string | null | undefined;
  _extra?;

  constructor(options) {
    const { code, data, msg, ...other } = options;
    this.code = options?.code;
    this.data = options?.data;
    this.msg = options?.msg;
    this._extra = other;
  }
}

export { ResultError } from "./error";
