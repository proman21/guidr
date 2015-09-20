module.exports = {
  context: __dirname + "/src/app",
  entry: {
    javascript: "./main.js",
    html: "./index.html",
  },
  output: {
    path: __dirname + "/build/app",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  },
  devtool: "source-map"
}
