import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import svgrPlugin from "vite-plugin-svgr";
import { PluginOption, defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    envPrefix: 'VITE_',
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
    ] as PluginOption[],
    server: {
      host: env.VITE_SERVER_HOST || 'localhost',
      port: Number(env.VITE_SERVER_PORT) || 3000,
    },
  };
});
export default config;