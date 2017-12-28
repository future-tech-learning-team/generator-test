/**
 * Created by chenxuhua on 2017/12/8.
 */
const execa = require('execa');
const packageObj = require("../../../package.json");
const branch = require('git-branch');
const branchName = branch.sync();
const semver = require('semver');
const inquirer = require('inquirer');
const fs = require("fs");

execa.shellSync("npm run build");//先执行build
const detectionFileStatus = execa.shellSync('git diff');
if (detectionFileStatus.stdout) {
    console.log("有未提交的内容，请先行处理");
    process.exit();
}

if (branchName !== 'master') {
    const newVersion = semver.inc(packageObj.version, 'prerelease', 'beta')
    packageObj.version = newVersion;
    console.log("newVersion=", newVersion);
    fs.writeFileSync("package.json", JSON.stringify(packageObj, null, 2), "utf8");
    execa.shellSync('git add *');
    execa.shellSync('git commit -m "' + packageObj.version + '"');
    execa.shellSync('git push');
    console.log("非master分支执行完成");
    execa.shellSync("npm publish")
    console.log("发布成功")
}
else {
    const major = semver.major(packageObj.version);
    const minor = semver.minor(packageObj.version);
    const patch = semver.patch(packageObj.version);
    inquirer.prompt([{
        type: 'list',
        name: 'publishVersion',
        message: '请选择发布版本',
        choices: [(major + 1) + "." + minor + "." + patch, major + "." + (minor + 1) + "." + patch, major + "." + minor + "." + (patch + 1)],
        default: major + "." + minor + "." + (patch + 1)
    }]).then((answers) => {
        console.log('选择发布版本', answers.publishVersion);
        execa.shellSync("npm version " + answers.publishVersion)
        execa.shellSync("git  push --follow-tags")
        console.log("master分支执行完成");
        execa.shellSync("npm publish")
        console.log("发布成功")
    });
}









