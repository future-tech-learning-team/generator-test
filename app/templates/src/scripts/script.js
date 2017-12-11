/**
 * Created by chenxuhua on 2017/11/26.
 */
const babel = require("babel-core")
const path=require("path")
const fse = require('fs-extra')
const glob = require("glob")

var pathStr=path.resolve(__dirname,"../page/");
var pathDestinationStr=path.resolve(__dirname,"../../build/");

async function transcoder() {
   await fse.copy(pathStr,pathDestinationStr);
    glob("**/*.js",{cwd: pathDestinationStr ,nonull:false,absolute:true}, function (er, files) {
        files.forEach(function (file) {
            const result=babel.transformFileSync(file)
            fse.outputFileSync(file, result.code, 'utf8')
        })
    })
}
transcoder();





