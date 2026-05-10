import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { defineConfig } from '@rspack/cli';
import { DefinePlugin, rspack, type SwcLoaderOptions } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import pkg from './package.json' with { type: 'json' };

const isDev = process.env.NODE_ENV === 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
  path: `.env.${isDev ? 'development' : 'production'}`,
});

console.log('debug PRODUCTS_REMOTE_ENTRY:', process.env.PRODUCTS_REMOTE_ENTRY, process.env.NODE_ENV);

const productsRemoteEntry = process.env.PRODUCTS_REMOTE_ENTRY;

export default defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  target: ['browserslist:last 2 versions, > 0.2%, not dead, Firefox ESR'],
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@federation-internal': path.resolve(__dirname, 'src/federation/index.ts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css/auto',
      },
      {
        test: /\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              detectSyntax: 'auto',
              jsc: {
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            } satisfies SwcLoaderOptions,
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      // remotes: {
      //   productsMfe: 'productsMfe@http://localhost:3001/remoteEntry.js',
      // },
      shared: {
        react: {
          singleton: true,
          eager: false,
          requiredVersion: pkg.dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          eager: false,
          requiredVersion: pkg.dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          eager: false,
          requiredVersion: pkg.dependencies['react-router-dom'],
        },
        '@aurex/auth': {
          singleton: true,
          requiredVersion: pkg.dependencies['@aurex/auth'],
          eager: false,
        },
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new DefinePlugin({
      __PRODUCTS_MFE_ENTRY__: JSON.stringify(productsRemoteEntry),
    }),
    isDev && new ReactRefreshRspackPlugin(),
  ],
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[name].js' : '[name].[contenthash].js',
    publicPath: '/',
  },
});
