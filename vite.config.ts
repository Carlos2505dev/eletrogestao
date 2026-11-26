import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      target: "react",
      autoCodeSplitting: false,
      server: { entry: "server" },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        filter: ({ path }) => !path.startsWith("/api"),
      },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  server: {
    port: 4009,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  // Disable separate server build output by pointing it to client dir
  environments: {
    client: {
      build: {
        outDir: "dist",
      },
    },
    server: {
      build: {
        outDir: "dist",
      },
    },
  },
  ssr: {
    noExternal: ["@tanstack/react-start"],
  },
});