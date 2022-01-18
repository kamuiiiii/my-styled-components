const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
      publicPath: '/',
    },
    devtool: isProduction ? false : 'source-map',
    devServer: {
      historyApiFallback: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      })
    ]
  }
}
