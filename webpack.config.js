var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var inProduction  = (process.env.NODE_ENV === 'production');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // context: path.join(__dirname, 'dist'),
    entry: {
        main: [
            './src/main.js',
            './src/scss/build.scss'
        ],
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: require.resolve('modernizr'),
                use: [
                  'expose-loader?Modernizr',
                  'imports-loader?this=>window!exports-loader?window.Modernizr'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    // use: ['css-loader', 'sass-loader'],
                    use: [
                        {
                            loader: 'css-loader',
                            options: { 
                                url: true,
                            }
                        },
                        'postcss-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                              resources: './src/build.scss',
                              resources: ['./src/scss/modules/_var.scss', './src/scss/modules/_base.scss', "./src/scss/base/*.scss", "./src/scss/global/*.scss", "./src/scss/components/*.scss"]
                            }
                        },
                    ],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                  ]
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[path][name].[ext]'
                        }
                    },
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([
            { from: 'src/images',
        to: 'images' }
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // All options here: https://webpack.js.org/configuration/dev-server/

        // enable HMR on the server
        hot: true,
        inline: true,
        // match the output path
        contentBase: [path.join(__dirname, "./")],
        // enables auto refresh
        watchContentBase: true,
        // match the output `publicPath`
        publicPath: '/dist/',
        // Enable to integrate with Docker
        //host:"0.0.0.0",
        port: 3000,
        historyApiFallback: true,
        // All the stats options here: https://webpack.js.org/configuration/stats/
        stats: {
            colors: true, // color is life
            chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
            'errors-only': true
        }
    },
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}