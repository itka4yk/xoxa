module.exports = {
  entry: './src',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  target: 'node',
  mode: 'development',
  externals: [
    'sqlite3',
    'tedious',
    'pg-hstore',
    'mssql',
    'mysql',
    'oracle',
    'oracledb',
    'mssql/lib/base',
    'pg-native',
    'mssql/package.json',
    'pg-query-stream'
  ],
}
