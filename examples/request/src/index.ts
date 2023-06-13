import { HttpClient } from "../../packages/httpClient";
import { authHandler } from "./src/middleware/authHandler";
import { logHandler } from "./src/middleware/logHandler";

const httpClient = new HttpClient();

httpClient.use(logHandler).use(authHandler);

const httpRequest = httpClient.request.bind(httpClient);

const adapter =
  (fn) =>
  (url, ...args) =>
    fn?.({ url, ...args.reduce((pre, item) => ({ ...pre, ...item })) });

const request = adapter(httpRequest);

export { request, httpClient };
