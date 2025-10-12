// Note: You must restart bin/webpack-dev-server for changes to take effect

const { merge } = require("webpack-merge");

const { settings, output } = require("./configuration");
const sharedConfig = require("./shared");

const watchOptions = {};

if (process.env.VAGRANT) {
  // If we are in Vagrant, we can't rely on inotify to update us with changed
  // files, so we must poll instead. Here, we poll every second to see if
  // anything has changed.
  watchOptions.poll = 1000;
}

module.exports = merge(sharedConfig, {
  mode: "development",
  cache: true,
  devtool: "eval-cheap-module-source-map",

  stats: {
    errorDetails: true,
  },

  output: {
    pathinfo: true,
  },

  devServer: {
    compress: settings.dev_server.compress,
    host: settings.dev_server.host,
    port: settings.dev_server.port,
    https: settings.dev_server.https,
    hot: settings.dev_server.hmr,
    historyApiFallback: {
      disableDotRule: true,
    },
    headers: settings.dev_server.headers,
    client: {
      logging: "none",
      overlay: settings.dev_server.overlay,
    },
    static: {
      directory: settings.public_root_path,
      serveIndex: true,
      watch: Object.assign(
        {},
        settings.dev_server.watch_options,
        watchOptions,
      ),
    },
    devMiddleware: {
      publicPath: output.publicPath,
      stats: {
        entrypoints: false,
        errorDetails: false,
        modules: false,
        moduleTrace: false,
      },
      writeToDisk: filePath => /ocr/.test(filePath),
    },
  },
});
