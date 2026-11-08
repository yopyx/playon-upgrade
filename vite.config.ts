import { defineConfig, loadEnv } from "vite";
//import react from "@vitejs/plugin-react";
//import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {},
//     proxy: {
//       "/resources_api": {
//         target: "http://localhost:7117",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
// import fs from "fs";

// export default defineConfig({
//   server: {
//     https: {
//       key: fs.readFileSync("./localhost+2-key.pem"),
//       cert: fs.readFileSync("./localhost+2.pem"),
//     },
//     // "https://localhost:7117", https is used in development, while http in deployment since containerized backend is used.
//     proxy: {
//       "/resources_api": {
//         target: "https://localhost:7117",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: import.meta..VITE_ENVIRONMENT === "production"?"https://playonauth.runasp.net":"http://localhost:7117",
//         changeOrigin: true,
//       },
//       "/user_profile": {
//         target: "http://localhost:7117",
//         changeOrigin: true,
//       },
//     },
//   },
// });

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (e.g. '.env.development', '.env.production')
  // process.cwd() provides the current working directory path
  // The third parameter '' loads all variables, regardless of the VITE_ prefix
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Vite configuration options
    server: {
      proxy: {
        "/api": {
          target:
            env.VITE_ENVIRONMENT === "production"
              ? "https://playonauth.runasp.net"
              : "http://localhost:7117",
          changeOrigin: true,
        },
        "/user_profile": {
          target:
            env.VITE_ENVIRONMENT === "production"
              ? "https://playonauth.runasp.net"
              : "http://localhost:7117",
          changeOrigin: true,
        },
      },
    },
  };
});
