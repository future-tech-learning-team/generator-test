/**
 * Created by chenxuhua on 2017/12/8.
 */

const execa = require('execa');
const package = require("../package.json");   // 获取package.json
const branch = require('git-branch');
const branchName=branch.sync();
console.log(branchName);
const semver = require('semver');
const inquirer = require('inquirer');
const fs=require("fs");

var detectionFileStatus=execa.shellSync('git diff');
if(detectionFileStatus.stdout){
    console.log("有未提交的内容，请先行处理");
    return;
}

if(branchName !== 'master'){
    const newVersion=semver.inc(package.version, 'prerelease', 'beta')
    package.version=newVersion;
    console.log("newVersion=",newVersion);
    fs.writeFileSync("package.json", JSON.stringify(package,null, 2),"utf8");
    execa.shellSync('git add *');
    execa.shellSync('git commit -m "'+package.version+'"');
    execa.shellSync('git push');
    console.log("非master分支执行完成");
    execa.shell("npm publish")
    console.log("发布成功")
}
else{
    const major=semver.major(package.version);
    const minor=semver.minor(package.version);
    const patch=semver.patch(package.version);
    inquirer.prompt([{
        type    : 'list',
        name    : 'publishVersion',
        message : '请选择发布版本',
        choices: [(major+1)+"."+minor+"."+patch,major+"."+(minor+1)+"."+patch,major+"."+minor+"."+(patch+1)],
        default : major+"."+minor+"."+(patch+1)
    }]).then((answers) => {
        console.log('选择发布版本', answers.publishVersion);
        execa.shell("npm version "+answers.publishVersion+" && git  push —follow-tags")
        console.log("master分支执行完成");
        execa.shell("npm publish")
        console.log("发布成功")
    });
}









