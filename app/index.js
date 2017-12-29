'use strict';
const Generator = require('yeoman-generator');


module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: 'list',
            name: 'projectType',
            message: '选择项目类型',
            choices: ['pc', 'mobile'],
            default: "pc"
        }]).then((answers) => {
            this.log('你所选择的项目类型是', answers.projectType);
            this.projectType = answers.projectType;
        });
    }

    writing() {

        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath('src')
        );

        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copy(
            this.templatePath('.eslintignore'),
            this.destinationPath('.eslintignore')
        );
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath("index.html"),
            {projectType: this.projectType}
        );

    }

    install() {
        this.yarnInstall();
    }
};
