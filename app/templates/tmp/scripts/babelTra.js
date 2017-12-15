/**
 * Created by shiyunjie on 17/11/30.
 */
import "babel-polyfill";

//import babel from 'babel-core';
// var fs = require('fs');
import fs from 'fs-extra';
//import path from 'path';
//import { transform } from 'babel-core';
import * as babel from 'babel-core';
import glob from "glob";
//var build = 'build'; // 导出路径


/*const emptyDir = (fileUrl) => {
 var files = fs.readdirSync(fileUrl);//读取该文件夹

 files.forEach((file) => {

 var name = path.join(fileUrl, file)

 var stats = fs.statSync(name);
 if (stats.isDirectory()) {
 emptyDir(name);
 fs.rmdirSync(name); // 删除空目录
 } else {
 fs.unlinkSync(name);
 console.log("删除文件" + name + "成功");
 }
 });
 }*/

/*const init = () => {
 var exists = fs.existsSync(build)
 if (exists) {
 emptyDir(build)
 } else {
 fs.mkdirSync(build)
 }
 }*/
const success = 1

const main = async () => {
  /*  init();
   travel('src',build,babelTransform);
   babelTransform('./src/index.js');
   console.log( process.cwd())*/
  const removeResult = await remove('app');

  if (removeResult === success) {
    const travelResut = await travel('src', 'app', 'app/**/*.js');
    if (travelResut === success) {
      console.log('success!')
    } else {
      console.error(travelResut);
    }
  } else {
    console.error(removeResult);
  }


}

const remove = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.remove(fileName, err => {
      if (err) {
        reject({ err })
      } else {
        resolve(success)
      }
    })
  })
}

const travel = (src, dest, globPath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.copySync(src, dest);
      glob(globPath, {}, (error, files) => {
        if (error) {
          reject(error)
        }
        console.log(files);
        if (files.length > 0) {
          files.forEach(babelTransform);
        }
      })
      resolve(success)
    } catch (e) {
      reject(e)
    }

  })

}

/*
 const travel = (dir, out, callback) => {
 fs.readdir(dir, 'utf-8', (err, files) => {
 files.forEach((file) => {

 const fileName = path.join(dir, file); // 拼接路径

 console.log('travel_fileName:', fileName);
 //  lstatSync根据path活的 fs.state对象 判断是否为目录
 const outFile = path.join(out, file);
 if (fs.lstatSync(fileName).isDirectory()) {
 // 是目录，递归
 fs.mkdirSync(outFile)
 travel(fileName, outFile, callback);

 } else if (fileName.includes('.js')) {
 fs.copyFileSync(fileName, outFile);
 console.log('travel_outFile:', outFile);
 // 是js文件执行转码
 callback(outFile);
 }
 })
 })
 }*/


const babelTransform = (fileName) => {
  babel.transformFile(fileName, {
    babelrc: false,
    presets: ['env'],
    plugins: [
      "transform-runtime"
    ]
  }, (error, result) => {
    if(error){
      throw error
    }
    // 覆盖原文件
    //console.log('transformFile:',e)
    if (result && result.code) {
      fs.writeFileSync(fileName, result.code);
      // console.log('babel_result:', result.code);
      console.log('转码完成')
    }
  });
}

// 执行主函数
main();

