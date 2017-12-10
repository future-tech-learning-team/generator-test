/**
 * Created by chenxuhua on 2017/11/26.
 */
const babel = require("babel-core")
const path=require("path")
const fs=require("fs")
const buildRoot=path.resolve(__dirname,"../../build/page/")
let subDirectory=""
let files=[]

function babelAll(filepath) {
  if(fs.existsSync(filepath)) {
    console.log("filepath=",filepath);
    files = fs.readdirSync(filepath)
    files.forEach(function(file, index) {
      console.log("file=",file);
      const curPath = filepath + "/" + file
      if(fs.statSync(curPath).isDirectory()) { // recurse
          subDirectory=file;
          if(!fs.existsSync(path.join(buildRoot,file))) {
            fs.mkdirSync(path.join(buildRoot,file))
          }
          babelAll(curPath)
      }
      else {
          const result=babel.transformFileSync(path.resolve(__dirname,curPath))
          console.log(path.join(buildRoot,subDirectory,file));
          fs.writeFileSync(path.join(buildRoot,subDirectory,file), result.code, 'utf8')
      }
    });

  }
};
babelAll(path.resolve(__dirname,"../page/"))


export var name="陈叙华"


