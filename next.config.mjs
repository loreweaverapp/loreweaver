import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
    experimental: {serverActions: true},
    rewrites: async () => [
        {
            source: "/@:username",
            destination: "/users/:username",
        },
        {
            source: "/users/@:username",
            destination: "/users/:username",
        },
    ],
    pageExtensions: ["page.ts", "page.tsx"],
};
export default config;
