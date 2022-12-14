import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import sentryVitePlugin from "@sentry/vite-plugin";

const uploadSourceMapsToSentry =
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN;

console.log(
  "🚀 ~ file: vite.config.ts:6 ~ uploadSourceMapsToSentry",
  uploadSourceMapsToSentry
);
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  assetsInclude: ["**/*.docx"],
  plugins: [
    vue(),
    ...(uploadSourceMapsToSentry
      ? [
          sentryVitePlugin({
            include: "./dist",
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
        ]
      : []),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"],
  },
});
