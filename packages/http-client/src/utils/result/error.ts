import { IResponseError } from "@/constant";

export class ResultError {
  type: IResponseError;
  
  other? = {};

  constructor(options) {
    const { type = "unknown", ...other } = options ?? "";
    this.type = type;
    this.other = other;
  }
  stringify() {
    return JSON.stringify(this);
  }
}
