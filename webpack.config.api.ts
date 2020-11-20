import * as path from 'path';
import * as webpack from 'webpack';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";


const config: webpack.Configuration = {
    entry: {
        service_api: './src/bin/www.ts',
    },
    mode: `none`,
    target: "node",
    output: {
        path: path.resolve(__dirname, 'dist/api'),//! plz setup outDir in tsconfig.json if you want build many file, if you don't setup it, build export =1 file 
        filename: 'index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/api',
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json'],
    },
    optimization: {
        minimize: true,
        emitOnErrors: true,
        mangleWasmImports: true,
        removeAvailableModules: true,//? Set true when running in production
        removeEmptyChunks: true,
        mergeDuplicateChunks: true//? Set true when running in production
    },
    stats: {
        logging: "verbose",
        modulesSort: 'size'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new BundleAnalyzerPlugin()
    ],
};


export default config;