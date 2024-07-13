import path from 'path';
import { IEnv } from './src/types';
import webpack from 'webpack';
import { Configuration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const devServer = (port: number): Configuration => ({
  port,
  open: true,
  historyApiFallback: true,
});

const loaders = (isDevMode: boolean): webpack.RuleSetRule[] => {
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };
  
  const scssLoader = {
    test: /\.scss$/i,
    use: [
      isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /module\.scss$/i,
            localIdentName: isDevMode ? '[path][name]__[local]-[hash:base64:5]' : '[hash:base64:5]',
          },
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
    exclude: /node_modules/,
  };
  
  const svgLoader = {
    test: /\.svg$/i,
    oneOf: [
      {
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        type: 'asset',
      }],
  };
  
  const fileLoader = {
    test: /\.(png|jpg|jpeg|gif|ico|json)$/,
    exclude: /node_modules/,
    use: ['file-loader?name=[name].[ext]'],
  }
  
  return [
    tsLoader,
    scssLoader,
    svgLoader,
    fileLoader,
  ];
};

const resolvers = (): webpack.ResolveOptions => ({
  extensions: ['.tsx', '.ts', '.js'],
});

const plugins = (templatePath: string, isDevMode: boolean): webpack.WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      template: templatePath,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash:8].css`,
      chunkFilename: `css/[name].[contenthash:8].css`,
    }),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(isDevMode)
    }),
    new webpack.HotModuleReplacementPlugin()
  ];
};

export default (env: IEnv) => {
  const mode = env.mode || 'development';
  const isDevMode = mode === 'development';
  const PORT = env.port || 3003;
  
  const config: webpack.Configuration = {
    mode,
    devServer: isDevMode ? devServer(PORT) : undefined,
    devtool: isDevMode ? 'inline-source-map' : undefined,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: '[name].[contenthash:5].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: loaders(isDevMode)
    },
    resolve: resolvers(),
    plugins: plugins(path.resolve(__dirname, 'public', 'index.html'), isDevMode),
  };

  return config;
}
