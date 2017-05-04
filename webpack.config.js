var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpack = require('webpack');
var noVisualization = process.env.NODE_ENV === 'production' 
        || process.argv.slice(-1)[0] == '-p'
        || process.argv.some(arg => arg.indexOf('webpack-dev-server') >= 0);

module.exports = {
    entry: {
        enter: './enter/enter.js',
        workoutSearch: './workoutSearch/workoutSearch.js',
        today: './today/today.js'
    },
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./'),
            path.resolve('./node_modules'),
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: ['transform-decorators-legacy']
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
            "/enter": "http://localhost:3000",
            "/view": "http://localhost:3000",
            "/today": "http://localhost:3000",
            "/workout": "http://localhost:3000",
            "/tag": "http://localhost:3000",
            "/upload/video": "http://localhost:3000"
        }
    }
};