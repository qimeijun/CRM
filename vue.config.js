const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    assetsDir: 'assets',
    configureWebpack: {
        plugins: [
            new MiniCssExtractPlugin({
                filename: "static/[name].css",
                chunkFilename: "[id].css"
            })
        ],
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/style/variables.scss";`
            }
        }
    }
};