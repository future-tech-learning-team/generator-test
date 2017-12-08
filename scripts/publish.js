/**
 * Created by chenxuhua on 2017/12/8.
 */

const execa = require('execa');
const package = require("../package.json");   // 获取package.json
const branch = require('git-branch');
const branchName=branch.sync();
console.log(branchName);

//x.x.x-beta.x
//0.0.0-beta.1

var versionTest=/^\d\.\d\.\d-beta\.\d$/;
if(branchName !== 'master' && !versionTest.test(package.version)){
    console.log('非master分支，只能提交beta版本',"branchName",branchName,"version",package.version);
}
else{
    execa.shell("npm publish")
    console.log("发布成功")
}



