'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the bee\'s knees ' + chalk.red('generator-es6-browserify') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to install?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const files = [
      '.babelrc',
      '.gitignore',
      'gulpfile.js',
      'package.json',
      'src/index.js',
      'src/test.js',
    ];

    files.forEach(file => {
      this.fs.copy(
        this.templatePath(file),
       this.destinationPath(file)
      );
    });
  }

  install() {
    this.installDependencies();
  }
};
