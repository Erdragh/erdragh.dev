import { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    webpack: (config) => {
        config = {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.glsl/i,
                        use: "raw-loader"
                    }
                ]
            }
        }
        return config;
    },
    turbopack: {
        rules: {
            "*.glsl": {
                loaders: [{
                    loader: "raw-loader"
                }],
                    as: "*.js"
            }
        }
    }
};

export default nextConfig;
