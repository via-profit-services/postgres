import { Configuration } from 'webpack';

const webpackBaseConfig: Configuration = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  externals: [
    /^@via-profit-services\/core$/,
    /^pg$/,
    /^pg-hstore$/,
    /^pg-listen$/,
    /^graphql(|-tools|\/.+)$/,
    /^express$/,
  ],
};

export default webpackBaseConfig;
