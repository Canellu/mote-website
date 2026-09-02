import { describe, expect, it } from "vite-plus/test";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

describe("route tree", () => {
  it("includes the home route", () => {
    const router = createRouter({ routeTree });

    expect(router.routesById["/"]?.fullPath).toBe("/");
  });
});
