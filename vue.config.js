const path = require('path');

const devServerPort = 9527;
const mockServerPort = 9528;
const name = 'Vue Typescript Admin';

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: devServerPort,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        progress: false,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://localhost:${mockServerPort}/mock/`,
                changeOrigin: true, // needed for virtual hosted sites
                ws: true, // proxy web sockets
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: '',
                },
            },
        },
    },
    chainWebpack(config) {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        config.set('name', name);

        // https://webpack.js.org/configuration/devtool/#development
        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-eval-source-map'),
            );

        // remove vue-cli-service's progress output
        config.plugins.delete('progress');

        // replace with another progress output plugin to solve the this bug:
        // https://github.com/vuejs/vue-cli/issues/4557
        config.plugin('simple-progress-webpack-plugin')
            .use(require.resolve('simple-progress-webpack-plugin'), [{
                format: 'compact',
            }]);

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial', // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: path.resolve(__dirname, 'src/components'),
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true,
                            },
                        },
                    });
                    config.optimization.runtimeChunk('single');
                },
            );
    },
};
