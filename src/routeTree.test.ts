import { describe, expect, it } from "vite-plus/test";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

describe("route tree", () => {
  it("includes every public launch route", () => {
    const router = createRouter({ routeTree });

    const paths = Object.values(router.routesById).map((route) => route.fullPath);

    expect(paths).toEqual(
      expect.arrayContaining(["/", "/features", "/privacy", "/terms", "/support"]),
    );
  });
});
