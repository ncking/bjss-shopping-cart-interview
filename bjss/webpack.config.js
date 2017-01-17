var SRC_DIR = './src';
var PUBLIC_DIR = '../public';
var DIST_DIR = PUBLIC_DIR + '/dist';
var debug = false;//process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
//var minify = require('html-minifier').minify;
/*
 * 
 */
var defaultPlugins = [
    new CleanWebpackPlugin([DIST_DIR], {verbose: true}),
    new webpack.ProvidePlugin({_: "lodash"}),
    //  new webpack.ProvidePlugin({$: "jquery"}), // inserstsit where required
    new AssetsPlugin({filename: PUBLIC_DIR + '/assets.json', prettyPrint: true})
];
if (debug) {
    plugins = defaultPlugins;
} else {
    var prodPlugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: false}),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity)        // use this is you want to split VENDORS & APP code   
    ];
    plugins = defaultPlugins.concat(prodPlugins);
}

/*
 *
 */
module.exports = {
    context: __dirname,
    entry: {
        shoppingcart: SRC_DIR + "/main.js", // we use the key 'app' here because we are also specifying 'vendors' entry point
        //vendors: ['lodash']
    },
    resolve: {
        extensions: ['', '.js', '.ejs']
    },
    module: {
        loaders: [
            // .ejs Underscore/Lodash templates
            {test: /\.ejs$/, loader: 'ejs-loader'}
        ]
    },
    output: {
        path: DIST_DIR,
        publicPath: "/js/", // for the assets JSON obj
        filename: "[name].js" // _[chunkhash]
    },
    plugins: plugins
};


