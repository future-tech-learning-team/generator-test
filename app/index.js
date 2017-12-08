/**
 * Created by shiyunjie on 17/11/21.
 */
const Generator = require('yeoman-generator');
//const fs = require('fs');
const fs = require('fs-extra')

module.exports = class extends Generator {


  constructor(args, opts) {
    super(args, opts);

    // 添加你自己的option
    /*  this.option('inputName', {
     type: String,
     desc: 'your app name',
     defaults: 'test-app'
     }); // This method adds support for a `--inputname` flag
     */
    this.projectType = {}
    this.appName = 'myApp'

  }
  prompting() {
  /*  return this.prompt([{
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : this.appname // Default to current folder name
      }, {
        type    : 'confirm',
        name    : 'cool',
        message : 'Would you like to enable the Cool feature?'
      }]).then((answers) => {
        this.log('app name', answers.name);
    this.log('cool feature', answers.cool);
  });*/

    return this.prompt([ {
      type: 'input',
      name: 'appname',
      message: 'name your project',
      default : this.appName
    },
      {
        type: 'list',
        name: 'projectType',
        message: 'which type do you need?',
        choices: ['PC', 'App'],
        filter: function(val) {
          return val.toLowerCase();
        }
      }]).then((answers) => {
        this.projectType = answers.projectType
        this.appName = answers.appname
        this.log(this.projectType,this.appName);
  });
  }

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');

  }

  writing(){
    switch (this.projectType){
      case 'pc':
        this._private_copyFile('pc.txt',{title: 'Templating with Yeoman pc.txt' });
        break;
      case 'app':
        this._private_copyFile('app.txt',{title: 'Templating with Yeoman app.txt' });
        break;
      default:
        break;
    }

    try {
      fs.copySync('/tmp', this.destinationPath())
      console.log('copy success!')
    } catch (err) {
      console.error(err)
    }

    //this._private_copyFile('package.json',{appname: this.options.inputname});

   /*
    this._private_copyFile('package.json',{appname: this.appName});
    this._private_copyFile('.babelrc',{}); // Babel 转码配置
    this._private_copyFile('./scripts/babelSrc.sh',{});
    this._private_copyFile('./scripts/babelTra.js',{});
    //this._private_copyFile('./build/',{});
    this._private_copyFile('./src/index.js',{});
    this._private_copyFile('./src/pages/',{}); // 先建目录
    this._private_copyFile('./src/pages/home.js',{}); */


    process.exit(0)
  }

  _private_copyFile(fileName,template) { // 私有方法，不会自动执行
    console.log('copyFile');
    //if(this.fs.exists(this.destinationPath(fileName))){
    //  this.fs.delete(this.destinationPath(fileName))
    //}
    this.fs.copyTpl(
      this.templatePath(fileName),
      this.destinationPath(fileName),
      template
    );

  }


  // 方法名称无所谓,脚手架会按顺序同步执行  method1，method2 。。。
};