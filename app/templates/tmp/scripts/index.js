/**
 * Created by shiyunjie on 17/12/8.
 */

require('babel-register')({
  presets: ["env"],
  plugins: [
    "transform-runtime",
    "transform-decorators-legacy"
  ]
});
require('./babelTra.js');