const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin({
        test: /\.css$/i,
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ];
  }
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash:8].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: true,
      },
    },
    'css-loader',
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
  if (preset) {
    options.presets.push(preset);
  }
  return options;
};

const jsLoaders = () => [
  {
    loader: 'babel-loader',
    options: babelOptions(),
  },
];

const pages = fs.readdirSync(path.resolve(__dirname, 'src')).filter((fileName) => fileName.endsWith('.html'));

const plugins = () => {
  return [
    ...pages.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: page,
          filename: page,
          inject: 'body',
          minify: {
            collapseWhitespace: isProd,
          },
        })
    ),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, './src'),
          globOptions: {
            ignore: ['**/*.js', '**/*.ts', '**/*.css', '**/*.scss', '**/*.sass', '**/*.html'],
          },
          noErrorOnMissing: true,
          force: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ];
};

module.exports = {
  mode: 'development',
  target: ['web', 'es6'],
  entry: {
    options: '@babel/polyfill',
    main: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
    chunkFilename: '[id].[chunkhash].js',
    sourceMapFilename: '[file].map',
    assetModuleFilename: '[file]',
  },
  performance: {
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@models': path.resolve(__dirname, 'src/models'),
    },
  },
  optimization: optimization(),
  devServer: {
    hot: true,
    port: 8888,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-typescript'),
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
    ],
  },
};
