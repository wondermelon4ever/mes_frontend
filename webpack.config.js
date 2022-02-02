var webpack = require('webpack');
const  path = require('path');

module.exports = {
    mode: 'development',
    // enntry file
    entry: '/src/index.js',
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, '/public/'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", "jsx" ],
        modules: ['node_modules']
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 4000,
        static: {
            directory: __dirname+'/public/',
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [ 'react','es2015' ]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src/')
                ],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [ '@babel/preset-react', '@babel/preset-env' ],
                    // 아래 설정은 Plugin/Preset files are not allowed to export objects, only functions 에러 발생함
                    // presets: [ 'react', 'es2015', '@babel/env', '@babel/react', '@babel/preset-react', '@babel/preset-env' ],
                    plugins: [ 'transform-class-properties', '@babel/plugin-proposal-class-properties' ]
                },  
            },
            {
                test: /\.css$/i,
                include: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            },
            {
                test: /\.js?$/, loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};