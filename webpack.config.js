// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин
// module.exports = {
//     entry: { main: './src/index.js' },
//     output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//         publicPath: ''
//   },
//     mode: 'development',
//   devServer: {
//     static: path.resolve(__dirname, './dist'),
//     compress: true,
//     port: 8080,
//     open: true
//   },
//     module: {
//     rules: [ // rules — это массив правил
//       // добавим в него объект правил для бабеля
//       {
//         // регулярное выражение, которое ищет все js файлы
//         test: /\.js$/,
//         // при обработке этих файлов нужно использовать babel-loader
//         use: 'babel-loader',
//         // исключает папку node_modules, файлы в ней обрабатывать не нужно
//         exclude: '/node_modules/'
//       }
//       ]
      
//   }
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html' // путь к файлу index.html
//     }),
//     new CleanWebpackPlugin(), // использовали плагин
//   ] 
// };
// // переписали точку выхода, используя утилиту path 
//   // указали в какой файл будет собираться весь js и дали ему имя 
//    // указали первое место, куда заглянет webpack, — файл index.js в папке src 

// // module.exports — это синтаксис экспорта в Node.js 
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// // подключите к проекту mini-css-extract-plugin
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   entry: { main: './src/index.js' },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//         publicPath: ''
//   },
//     mode: 'development',
//   devServer: {
//     static: path.resolve(__dirname, './dist'),
//     compress: true,
//     port: 8080,
//     open: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: 'babel-loader',
//         exclude: /node_modules/
//       }
//       // добавьте ещё одно правило:
//   {
//     // применять это правило только к CSS-файлам
//     test: /\.css$/,
//     // при обработке этих файлов нужно использовать
//     // MiniCssExtractPlugin.loader и css-loader
//     use: [MiniCssExtractPlugin.loader, {
//       loader: 'css-loader'
//     }]
//   }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     }),
//         new CleanWebpackPlugin(),
//         new MiniCssExtractPlugin() // подключение плагина для объединения файлов
//   ]
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

  ]
}