/**
 * Created by chenxuhua on 2017/12/8.
 */
const execa = require('execa')
const branch = require('git-branch')
const branchName = branch.sync()
const semver = require('semver')
const inquirer = require('inquirer')
const fs = require("fse")

execa.shellSync("npm run build")//先执行build
const detectionFileStatus = execa.shellSync('git status -uno --s')
if (detectionFileStatus.stdout) {
    console.log("有未提交的内容，请先行处理")
    process.exit()
}

if (branchName !== 'master') {
    let packageObj = require("../../../package.json");
    const newVersion = semver.inc(packageObj.version, 'prerelease', 'beta')
    packageObj.version = newVersion
    console.log("newVersion=", newVersion)
    fs.writeFileSync("package.json", JSON.stringify(packageObj, null, 2), "utf8")
    packageObj.devDependencies={}
    packageObj.scripts={};
    fs.writeFileSync("build/package.json", JSON.stringify(packageObj, null, 2), "utf8")
    execa.shellSync('git add *')
    execa.shellSync('git commit -m "' + packageObj.version + '"')
    execa.shellSync('git push')
    console.log("非master分支执行完成")
    execa.shellSync('cd build && npm publish')
    fs.copyFileSync('README.md', 'build/README.md')
    console.log("发布成功")
}
else {
    inquirer.prompt([{
        type: 'list',
        name: 'publishVersion',
        message: '请选择发布版本',
        choices: ["主版本号","次版本号","修订号"],
        default:"主版本号"
    }]).then((answers) => {
        let tag="major"
        if(answers.publishVersion==="次版本号"){
            tag="minor"
        }
        else if(answers.publishVersion==="修订号"){
            tag="patch"
        }
        let packageObj = require("../../../package.json")
        const newVersion = semver.inc(packageObj.version, tag)
        console.log('你选择的发布版本', answers.publishVersion,newVersion)
        execa.shellSync("npm version " + newVersion)

        packageObj.version = newVersion
        packageObj.devDependencies={}
        packageObj.scripts={};
        fs.writeFileSync("build/package.json", JSON.stringify(packageObj, null, 2), "utf8")
        // execa.shellSync('git add *')
        // execa.shellSync('git commit -m "' + packageObj.version + '"')

        execa.shellSync("git  push --follow-tags")
        console.log("master分支执行完成");
        execa.shellSync('cd build && npm publish')
        fs.copyFileSync('README.md', 'build/README.md')
        console.log("发布成功")
    });
}









