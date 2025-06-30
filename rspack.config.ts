import type { Configuration } from '@rspack/core';
import * as plugins from '@krutoo/utils/rspack';

export default {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    // comment aliases to use react instead preact
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  plugins: [
    plugins.pluginTypeScript(),
    plugins.pluginCSS(),
    plugins.pluginHTML({ template: './src/index.html' }),
  ],
  devServer: {
    port: 1234,
    hot: false,
    liveReload: true,
    static: false,
    host: '0.0.0.0',
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
} satisfies Configuration;
