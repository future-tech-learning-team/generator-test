/**
 * Created by chenxuhua on 2017/11/26.
 */
const babel = require("babel-core")
const path = require("path")
const fse = require('fs-extra')
const globPromise = require("glob-promise")
const sourcePath = path.resolve(__dirname, "../../module/")
const destinationPath = path.resolve(__dirname, "../../../build/")


// 包装方法wrap，入参为待包装的异步函数
function wrap(func) {
    //包装函数返回的新函数在执行时，将会返回一个Promise对象，
    return function () {
        return new Promise((resolve, reject) => {
            arguments[arguments.length++] = function (err, ...rest) {
                if (err) {
                    reject(err);
                }
                //异步回掉进入的时候将异步结果resolve回去
                resolve(rest);
            }
            //此处可以看出包装函数在执行时实际上还是执行原来的异步函数func,只是对arguments做了修改
            func.apply(this, arguments)
        })
    }
}
const transformFile = wrap(babel.transformFile);


globPromise("**/*.js", {
    cwd: sourcePath,
    absolute: false
}).then(function (files) {
    files.forEach(function (file) {
        transformFile(path.resolve(sourcePath, file)).then(function (result) {
            fse.outputFile(path.resolve(destinationPath, file), result.code, 'utf8').then(function () {
                console.log("文件转码成功", file);
            }).catch(function () {
                console.log("文件转码失败", error);
            })
        }).catch(function (error) {
            console.log("文件转码失败", error);
        })
    })
}).catch(function (error) {
    console.log("构建失败", error);
})



