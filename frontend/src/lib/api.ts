import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";

// FE, BE at same port, same origin
export const client = hc<ApiRoutes>("/", {
  init: {
    credentials: "include",
  },
});
