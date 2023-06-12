import { HttpClient } from "../httpClient";
import { authHandler } from "./middleware/authHandler";
import { logHandler } from "./middleware/logHandler";

const httpClient = new HttpClient();

httpClient.use(logHandler).use(authHandler);

const httpRequest = httpClient.request.bind(httpClient);

const adapter =
  (fn) =>
  (url, ...args) =>
    fn?.({ url, ...args.reduce((pre, item) => ({ ...pre, ...item })) });

const request = adapter(httpRequest);

export { request, httpClient };
