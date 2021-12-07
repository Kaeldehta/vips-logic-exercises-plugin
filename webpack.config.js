const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
        },
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
        },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};