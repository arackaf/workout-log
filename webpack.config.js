var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpack = require('webpack');
var noVisualization = process.env.NODE_ENV === 'production' 
        || process.argv.slice(-1)[0] == '-p'
        || process.argv.some(arg => arg.indexOf('webpack-dev-server') >= 0);

module.exports = {
    entry: {
        enter: './enter/enter.js'
    },
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    },
    resolve: {
        modules: [
            path.resolve('./'),
            path.resolve('./node_modules'),
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015-webpack', 'stage-1', 'stage-2'],
                    plugins: ['transform-decorators-legacy', 'external-helpers']
                }
            }
        ]
    },
    plugins: [
        // (!noVisualization ? 
        //     new BundleAnalyzerPlugin({
        //         analyzerMode: 'static'
        //     }) : null),
    ].filter(p => p),
    devServer: {
        proxy: {
            "/action": "http://localhost:3000",
        }
    }
};