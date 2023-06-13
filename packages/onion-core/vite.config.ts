/** @type {import('vite').UserConfig} */
import { resolve } from "path";
import { defineConfig } from "vitest/config";
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "Onion",
      formats: ["umd"],
      // the proper extensions will be added
      fileName: "onion",
    },
  },
});
