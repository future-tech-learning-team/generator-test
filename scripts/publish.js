/**
 * Created by chenxuhua on 2017/12/8.
 */

const execa = require('execa');
const package = require("../package.json");   // 获取package.json
const branch = require('git-branch');
const branchName=branch.sync();
console.log(branchName);
const semver = require('semver');

var newVersion=semver.inc('1.2.3', 'patch')
console.log("str=",newVersion);

// major(v): Return the major version number.
// minor(v): Return the minor version number.
// patch(v): Return the patch version number.


var versionTest=/^\d\.\d\.\d-beta\.\d$/;
if(branchName !== 'master'){
    var newVersion=semver.inc(package.version, 'prerelease', 'beta')
    console.log("预发布版本version=",package.version);
}
else{
    var major=semver.major(package.version);
    var minor=semver.minor(package.version);
    var patch=semver.patch(package.version);
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

var inquirer = require('inquirer');





