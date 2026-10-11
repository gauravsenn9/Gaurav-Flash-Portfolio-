import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The wrapper already registers Nitro, React and TanStack plugins.
export default defineConfig({
  nitro: { preset: "vercel" },
  tanstackStart: { server: { entry: "server" } },
});
