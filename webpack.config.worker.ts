import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    entry: {
        service_worker: "./src/worker/start.worker.ts",
    },
    mode: `development`,
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist/worker"), //! plz setup outDir in tsconfig.json if you want build many file, if you don't setup it, build export =1 file
        filename: "index.js",
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".json"],
    },
    optimization: {
        minimize: true,
        emitOnErrors: true,
        mangleWasmImports: true,
        removeAvailableModules: true, //? Set true when running in production
        removeEmptyChunks: true,
        mergeDuplicateChunks: true, //? Set true when running in production
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
};

export default config;
