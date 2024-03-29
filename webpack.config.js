const webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');
module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        "chromy-bench": __dirname + "/src/index.es6",
        "chromy-bench-test": __dirname + "/test/index.es6",
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
          })*/
    ],
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                "presets": [
                    ["env", {
                        "targets": {
                            "node": "current"
                        }
                    }]
                ],
            }
        }]
    }
};