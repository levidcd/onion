import { stringify } from "querystring";
/**
 * Add params to the URL
 * 转换params到url上
 */
const assembleURL = (url: string, params: Record<string, any>) => {
  return /\?/.test(url)
    ? url 
    : url + "?" + stringify(params);
};

export default assembleURL;
