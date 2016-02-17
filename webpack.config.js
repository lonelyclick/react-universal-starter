module.exports = {
  entry: {
    'main': './server/client.js'
  },
  output: {
    path: 'client',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loaders: 'babel'}
    ]
  }
}
