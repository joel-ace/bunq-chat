const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    path.resolve(__dirname, './src/index.js')
  ],

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, './src'),
        ],
        loader: 'babel-loader',

        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(css|scss)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components/'),
      helpers: path.resolve(__dirname, './src/helpers/'),
      api: path.resolve(__dirname, './src/api/'),
      reducers: path.resolve(__dirname, './src/reducers/'),
      actions: path.resolve(__dirname, './src/actions/'),
      context: path.resolve(__dirname, './src/context/'),
      src: path.resolve(__dirname, './src/'),
    },
  },
  devServer: {
    contentBase: './public',
    port: 8000,
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
};
