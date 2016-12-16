'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var nameResolver = require('../utils/name-resolver');
var _ = require('lodash');


module.exports = yeoman.generators.Base.extend({
  writing: {

    //Ask for user input
    prompting: function() {
      var done = this.async();
 
        // have Yeoman greet the user
        console.log(this.yeoman);
 
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Adventourer: Your component name',
            //Defaults to the project's folder name if the input is skipped
            default: this.appname
        },
        {
            type: 'checkbox',
            message: 'Adventourer: Select elements for engine module',
            name: 'cmppakage',
            choices: [
              {
                name: 'jade',
                checked: true
              },
              {
                name: 'scss',
                checked: true
              },
              {
                name: 'javascripts',
                checked: true
              }
            ]
          }

        ];
 
        this.prompt(prompts, function (answers) {
            this.props = answers;

            this.props.variableName = this.props.name; // -> some-project
            this.props.jsVarsName = nameResolver.toCamel(this.props.name); // -> someProject
            this.props.humanReadableName = _.capitalize(nameResolver.toHumanReadableName(this.props.name));// Some project
            this.props.varUnderName = nameResolver.toLowerUnderscore(this.props.name);//some_project

            this.props.jade = true;
            this.props.scss = true;
            this.props.javascripts = true;

            if (!(_.includes(answers.cmppakage, 'jade'))) {this.props.jade = false}
            if (!(_.includes(answers.cmppakage, 'scss'))) {this.props.scss = false}
            if (!(_.includes(answers.cmppakage, 'javascripts'))) {this.props.javascripts = false}
            // this.log(_a);
            done();
        }.bind(this));
    },

    

    //Copy application files
    app: function() {
      var lowCasedName = nameResolver.toLowerCaseWithoutSpec(this.props.variableName);
      var clientlibs = lowCasedName + "libs";

      // if (this.props.css) {
      //   this.fs.copyTpl(
      //     this.templatePath('clientlibs/_css.txt'),
      //     this.destinationPath(this.props.variableName + '/'+ clientlibs + '/css.txt'), this.props
      //   );

      //   this.fs.copyTpl(
      //     this.templatePath('clientlibs/css/_cmp_styles-main.css'),
      //     this.destinationPath(this.props.variableName + '/'+ clientlibs + '/css/' + this.props.name + '-main.css'), this.props
      //   );
      // }

      if (this.props.javascripts) {
        this.fs.copyTpl(
          this.templatePath('js/_cmp_js-init.js'),
          this.destinationPath('src/scripts/components/' + this.props.name + "/" + this.props.name + '-init.js'), this.props
        );

        this.fs.copyTpl(
          this.templatePath('js/_cmp_js-controller.js'),
          this.destinationPath('src/scripts/components/' + this.props.name + "/" + this.props.name + '-controller.js'), this.props
        );
      }

      if (this.props.jade) {
        this.fs.copyTpl(
          this.templatePath('jade/cmp-tpl.jade'),
          this.destinationPath('src/jade/components/' + '_cmp-' + this.props.name + '.jade'), this.props
        );
      }

      if (this.props.scss) {
        this.fs.copyTpl(
          this.templatePath('scss/cmp-tpl.scss'),
          this.destinationPath('src/styles/components/' + this.props.name + '.scss'), this.props
        );
      }
    },
    
    //Install Dependencies
    install: function() {
      // this.installDependencies();
    }
  },
});


// https://scotch.io/tutorials/create-a-custom-yeoman-generator-in-4-easy-steps