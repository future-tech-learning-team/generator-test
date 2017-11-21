/**
 * Created by shiyunjie on 17/11/21.
 */
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // 添加你自己的option
    this.option('inputname', {
      type: String,
      desc: 'your app name',
      defaults: 'test-app'
    }); // This method adds support for a `--babel` flag
  }

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');

  }

  writing(){
    this._private_copyFile('test.txt',{title: 'Templating with Yeoman test.txt' });
    this._private_copyFile('package.json',{appname: this.options.inputname});
    this._private_copyFile('.babelrc',{}); // Babel 转码配置
    this._private_copyFile('./scripts/babelSrc.sh',{});
    //this._private_copyFile('./build/',{});
    this._private_copyFile('./src/index.js',{});
  }

  _private_copyFile(fileName,template) { // 私有方法，不会自动执行
    console.log('copyFile');
    if(this.fs.exists(this.destinationPath(fileName))){
      this.fs.delete(this.destinationPath(fileName))
    }
    this.fs.copyTpl(
      this.templatePath(fileName),
      this.destinationPath(fileName),
      template
    );

  }

  // 方法名称无所谓,脚手架会按顺序同步执行  method1，method2 。。。
};