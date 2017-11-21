/**
 * Created by shiyunjie on 17/11/21.
 */
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // 添加你自己的option
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');

  }

  writing(){
    this.fs.copy(
      this.templatePath('test.txt'),
      this.destinationPath('test.txt'),
      { title: 'Templating with Yeoman test.txt' }
    );
  }

  _private_method() { // 私有方法，不会自动执行
    console.log('private hey');

  }

  // 方法名称无所谓,脚手架会按顺序同步执行  method1，method2 。。。
};