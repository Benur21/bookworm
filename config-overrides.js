// override webpack.config.js configs
module.exports = function override(config, env) {
  config.stats = "errors-warnings";
  return config
}