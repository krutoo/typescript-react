import { Configuration } from '@rspack/core';
import * as utils from '@krutoo/utils/rspack';

const config: Configuration = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  plugins: [
    utils.pluginTypeScript(),
    utils.pluginCSS({ extract: { filename: '[name].[contenthash:5].css' } }),
    utils.pluginHTML({ inject: 'head', template: './src/index.html' }),
  ],
  devServer: {
    port: 1234,
    static: false,
    hot: false,
    liveReload: true,
    host: '0.0.0.0',
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

export default config;
