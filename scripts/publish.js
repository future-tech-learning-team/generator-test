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



if(branchName !== 'master'){
    const newVersion=semver.inc(package.version, 'prerelease', 'beta')
    package.version=newVersion;
    console.log("newVersion=",newVersion);
    fs.writeFileSync("package.json", JSON.stringify(package,null, 2),"utf8");
    execa.shellSync('git commit -m "'+package.version+'"');
    execa.shellSync('git push');
    console.log("到这里");
  //  git commit + git push

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
        // this.projectType = answers.projectType;
    });
}

execa.shell("npm publish")
console.log("发布成功")







