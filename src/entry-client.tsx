import { hydrateRoot } from "react-dom/client";
import { getRouter } from "./router";
import { StartClient } from "@tanstack/react-start/client";

const router = getRouter();

router.start({
  onError: (error) => {
    console.error(error);
  },
});

hydrateRoot(document, <StartClient router={router} />);