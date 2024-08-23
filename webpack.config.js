const path = require("path");

module.exports = {
  entry: {
    content: "./content.js",
    background: "./background.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  optimization: {
    minimize: false,
  },
};
