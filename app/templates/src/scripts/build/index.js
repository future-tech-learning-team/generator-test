/**
 * Created by chenxuhua on 2017/11/26.
 */
const babel = require("babel-core")
const path = require("path")
const fse = require('fs-extra')
const glob = require("glob")
const sourcePath = path.resolve(__dirname, "../../page/");
const destinationPath = path.resolve(__dirname, "../../build/");

function transcoder() {
    glob("**/*.js", {
        cwd: sourcePath,
        absolute: false
    }, function (er, files) {
        files.forEach(function (file) {
            const result = babel.transformFileSync(path.resolve(sourcePath, file))
            fse.outputFileSync(path.resolve(destinationPath, file), result.code, 'utf8')
        })
    })
}
transcoder();





