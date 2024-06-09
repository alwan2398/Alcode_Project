import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite"; // Tambahkan loadEnv di sini
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      viteCompression({
        algorithm: "gzip",
        threshold: 10240, // Only compress files larger than 10KB
        ext: ".gz",
      }),
      viteCompression({
        algorithm: "brotliCompress",
        threshold: 10240, // Only compress files larger than 10KB
        ext: ".br",
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env": env, // Ensure process.env is defined for use in the code
    },
  };
});
