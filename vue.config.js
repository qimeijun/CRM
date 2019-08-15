const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩代码
const CompressionPlugin = require("compression-webpack-plugin")
// process.env.NODE_ENV == 'production' ? 
module.exports = {
    assetsDir: 'assets',
    configureWebpack: {
        plugins: [
            new MiniCssExtractPlugin({
                filename: "static/[name].css",
                chunkFilename: "[id].css"
            }),
            // 压缩代码
            new CompressionPlugin({
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                deleteOriginalAssets: true
            })
        ]
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