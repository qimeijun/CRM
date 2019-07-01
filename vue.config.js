const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    assetsDir: 'assets',
    configureWebpack: {
        // module: {
        //     rules: [{
        //         test: /\.scss$/,
        //         use: [
        //             // fallback to style-loader in development
        //             process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        //             "css-loader",
        //             "sass-loader"
        //         ]
        //     }]
        // },
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