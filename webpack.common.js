const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackSymlinkPlugin = require('webpack-symlink-plugin');
const os = require('os');

module.exports = {
  entry: {
    'phoenix.js': './src/index.ts',
    'phoenix.debug.js': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: '[name]',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackSymlinkPlugin({
      symlinkList: [
        {
          src: path.resolve(__dirname, 'out', 'phoenix.debug.js'),
          dest: path.join(os.homedir(), '.phoenix.js'),
        },
      ],
      onSuccess: function () {},
    }),
  ],
};
