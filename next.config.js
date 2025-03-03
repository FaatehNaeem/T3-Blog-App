/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        loader: 'custom',
        loaderFile: './public/my/img/loader.ts',
    },
    eslint:{
        ignoreDuringBuilds:true
    }
};

export default config;
