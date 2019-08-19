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
        plugins: plugins,
        // 外部扩展   不用下载包，直接引用cdn
        externals: {
            "axios": "axios",
            "echarts": "echarts",
            "vuex": "Vuex",
            "vue": "Vue",
            "vue-router": "VueRouter",
            "qs": "Qs",
            "core-js": "core"
          }
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