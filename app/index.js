/**
 * Created by shiyunjie on 17/11/21.
 */
const Generator = require('yeoman-generator');
const fs = require('fs-extra');

// 方法名称无所谓,脚手架会按顺序同步执行  method1，method2 。。。
module.exports = class extends Generator {


  constructor(args, opts) {
    super(args, opts);

    this.projectType = {};
    this.appName = 'myApp'

  }

  prompting() {

    return this.prompt([{
      type: 'input',
      name: 'appname',
      message: 'name your project',
      default: this.appName,
    },
      {
        type: 'list',
        name: 'projectType',
        message: 'which type do you need?',
        choices: ['PC', 'App'],
        filter: (val) => {
          return val.toLowerCase();
        }
      }]).then((answers) => {
      this.projectType = answers.projectType;
      this.appName = answers.appname;
      this.log(this.projectType, this.appName);
    });
  }

  writing() {
    try {
      fs.copySync(this.templatePath('tmp'), this.destinationPath());
      console.log('copy success!')
    } catch (err) {
      console.error(err);
    }
    this._private_copyFile('package.json', { appname: this.appName });

    process.exit(0); // 正常结束
  }

  _private_copyFile(fileName, template) { // 私有方法，不会自动执行
    console.log('copyFile');
    const packageObj = fs.readJsonSync(this.templatePath(fileName));
    packageObj.name = template.appname;
    fs.writeFileSync(this.destinationPath(fileName), JSON.stringify(packageObj,null, '\t'));
  }

};