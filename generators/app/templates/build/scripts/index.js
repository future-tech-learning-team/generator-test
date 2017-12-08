"use strict";

/**
 * Created by chenxuhua on 2017/11/26.
 */
var babel = require("babel-core");
var path = require("path");
var fs = require("fs");
var buildRoot = path.resolve(__dirname, "../../build/page/");
var subDirectory = "";

function babelAll(filepath) {
  if (fs.existsSync(filepath)) {
    console.log("filepath=", filepath);
    files = fs.readdirSync(filepath);
    files.forEach(function (file, index) {
      console.log("file=", file);
      var curPath = filepath + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        subDirectory = file;
        if (!fs.existsSync(path.join(buildRoot, file))) {
          fs.mkdirSync(path.join(buildRoot, file));
        }
        babelAll(curPath);
      } else {
        var result = babel.transformFileSync(path.resolve(__dirname, curPath));
        console.log(path.join(buildRoot, subDirectory, file));
        fs.writeFileSync(path.join(buildRoot, subDirectory, file), result.code, 'utf8');
      }
    });
  }
};
babelAll(path.resolve(__dirname, "../page/"));