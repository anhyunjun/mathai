import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
    exclude: [
      "chunk-DBT4DOZU",
      "chunk-3HQUTTKX",
      "chunk-WZXEWI5Y",
      "chunk-LXKI6MQA",
      "chunk-TVDRGQ55",
      "chunk-6BQTJCYI",
      "chunk-4F4ZN7IT",
      "chunk-TAH6EI2P",
      "chunk-U4PXOMKK",
      "chunk-MMWBCVN4",
    ],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
});
