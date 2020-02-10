// 代码打包
const CompressionPlugin = require("compression-webpack-plugin")
// JS代码压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// CSS代码压缩
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
let plugins = [];
if (process.env.NODE_ENV == 'production') {
    plugins = [
        /**
         * 将css 和 js 打包成gzip， 浏览器在请求时会自动带一个
         * Accept-Encoding 的请求头告诉服务器支持的压缩编码类型
         * 需要服务器端进行配置
         * 浏览器接受响应，检查请求头Content-encoding:gzip, 然后进行解压、解析、渲染
         */
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
        }),
        // 压缩CSS代码
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        })
    ]
}
module.exports = {
    assetsDir: 'assets',
    configureWebpack: {
        // 入口文件
        entry: './src/main.js',
        output: {
            filename: '[name].[hash].js'
        },
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
          },
          optimization: {
              splitChunks: {
                  chunks: "all",
                  cacheGroups: {
                    vendors: {
                      test: /[\\/]node_modules[\\/]/,
                      priority: -10
                    },
                    default: {
                      minChunks: 2,
                      priority: -20,
                      reuseExistingChunk: true
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sc|sa|c)ss$/,
                        chunks: 'all',
                        enforce: true
                      }
                  }
              }
            //   minimizer: [
            //       new TerserJSPlugin({}),
            //       new OptimizeCSSAssetsPlugin({})
            //   ]
          }
        //   module: {
        //       rules: [
        //           {
        //               test: /\.(sc|sa|c)ss$/,
        //               use: [
        //                   MiniCssExtractPlugin.loader,
        //                   'css-loader',
        //                   'postcss-loader',
        //                   'sass-loader'
        //               ]
        //           }
        //       ]
        //   }
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