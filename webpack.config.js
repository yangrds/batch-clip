const path = require('path');
const scoped = require('./_s')
scoped()
module.exports = {
    entry: './temp/clip.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'Clip',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            }
        ]
    }

};