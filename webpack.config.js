// For node to know our absolute file path we will be using the internal module path
const path = require("path");

// Our export here is the configuration webpack will use
module.exports = {
  mode: "development",
  // [entry] this is the file where the bundling starts from.
  entry: "./src/index.jsx",
  // [output] is a configuration object to determine how and where to bundle our code
  output: {
    // [path] is where to output
    path: path.join(__dirname, "public"),
    // [filename] is the name of the file
    filename: "bundle.js",
  },
  module: {
    // [rules] will determine the rules around those external modules
    rules: [
      // First rule is to idenify js and jsx files and turn on babel
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // test: /\.css$/i,
        test: /\.scss$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "eval-cheap-module-source-map",
  // [devServer] configuration for the live server including port
  devServer: {
    // [static] config for how what to serve
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    // [port] what port on our local machine to run the dev server
    port: 3000,
  },
  resolve: { extensions: [".js", ".jsx"] },
};
