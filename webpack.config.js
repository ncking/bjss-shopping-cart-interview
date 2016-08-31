const distDir = __dirname + '/public/dist/js'
const debug   = process.env.NODE_ENV === "development"
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var plugins = []
if (!debug) {
    var prodPlugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: false}) 
    ];
    plugins = plugins.concat(prodPlugins)
}


module.exports = {
    context: __dirname,
    entry: {
        shoppingcart: "./src/index.js"
    },
    resolve: {
        root: './src',
        extensions: ['', '.js', '.ejs', '.json']
    },
    module: {
        loaders: [
            {test: /\.ejs$/, loader: 'ejs-compiled-loader'},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    output: {
        path: distDir,
        filename: "[name].js"
    },
    plugins: plugins,
    
    resolveLoader: {
        root: __dirname + '/node_modules'
    },
};


