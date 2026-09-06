import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    /*
     * The stylesheet asks for smooth scrolling so in-page anchors glide. A
     * navigation is not an anchor: left on `auto`, the router's reset to the
     * top inherits that smoothness and the reader watches the page they are
     * leaving scroll itself all the way back up before the next one arrives.
     * Both the reset and a restored position are taken instantly instead, and
     * the view transition below carries the motion.
     */
    scrollRestorationBehavior: "instant",
    defaultHashScrollIntoView: { behavior: "instant", block: "start" },
    /*
     * Every navigation that changes the page runs inside a view transition, so
     * the swap is a cross-fade rather than a cut — and the instant scroll above
     * happens underneath it, where it is never seen. A move that only changes
     * the hash stays on the page the reader is already reading; dissolving it
     * into itself would read as a flash, so that one is left alone.
     */
    defaultViewTransition: {
      types: ({ pathChanged }) => (pathChanged ? ["page"] : false),
    },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
