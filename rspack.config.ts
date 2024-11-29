import rspack, { Configuration } from "@rspack/core";
import path from "node:path";

const config: Configuration = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    tsConfig: {
      configFile: path.resolve(import.meta.dirname, "./tsconfig.json"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
              jsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: {
                // making behavior of import in css same as in html plugin
                filter: (url: string) => !url.startsWith("/"),
              },
              modules: {
                auto: /\.(module|m)\.css$/i,
                exportLocalsConvention: "as-is",
                namedExport: false,
                localIdentName: "[name]__[local]--[hash:3]",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.CssExtractRspackPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      scriptLoading: "module",
      inject: "body",
    }),
  ],
  devServer: {
    port: 1234,
    hot: false,
    liveReload: true,
  },
};

export default config;
