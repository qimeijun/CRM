
const devMode = true;
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 代码打包
const CompressionPlugin = require("compression-webpack-plugin")
// 代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

let plugins = [];
if (process.env.NODE_ENV == 'production') {
    plugins = [
        // 提取css代码
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        // 将css 和 js 打包成gzip
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            minRatio: 0.8
        }),
        // 压缩JS代码
        new UglifyJsPlugin({
            test: /.js($|\?)/i,
            cache: true,
            parallel: true,
            extractComments: false
        })
    ]
}
module.exports = {
    assetsDir: 'assets',
    configureWebpack: {
        plugins: plugins
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/style/variables.scss";`
            }
        }
    },
    devServer: {
        port: 3003
    }
};