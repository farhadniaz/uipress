import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import dts from "vite-dts";

export default defineConfig({
  plugins: [solidPlugin(), dts()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    sourcemap: true,
    minify: false,
    lib: {
      formats: ["es", "cjs","umd"],
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "uipress",
      fileName: (format) => `uipress.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["solid-js"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "solid-js": "solid-js",
        },
        sourcemapExcludeSources: true,
      },
    },
  },
});
