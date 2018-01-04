'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var nameResolver = require('../utils/name-resolver');
var _ = require('lodash');

var VIEW_TYPE = "modal";
var VIEW_TYPE_POSTFIX = "-modal";

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
            message: 'Adventourer: Your modal component name',
            //Defaults to the project's folder name if the input is skipped
            default: this.appname
        },
        {
            type: 'checkbox',
            message: 'Adventourer: Select elements for engine module',
            name: 'cmppakage',
            choices: [
              {
                name: 'pug',
                checked: true
              },
              {
                name: 'styl',
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

            this.props.viewType = VIEW_TYPE;
            this.props.variableName = this.props.name + VIEW_TYPE_POSTFIX; // -> some-project-modal
            this.props.jsVarsName = nameResolver.toCamel(this.props.variableName); // -> someProjectModal
            this.props.humanReadableName = _.capitalize(nameResolver.toHumanReadableName(this.props.variableName));// Some project modal
            this.props.varUnderName = nameResolver.toLowerUnderscore(this.props.variableName);//some_project_modal
            this.props.className = nameResolver.toClassName(this.props.variableName); // SomeProjectModal

            this.props.pug = true;
            this.props.styl = true;
            this.props.javascripts = true;

            if (!(_.includes(answers.cmppakage, 'pug'))) {this.props.pug = false}
            if (!(_.includes(answers.cmppakage, 'styl'))) {this.props.styl = false}
            if (!(_.includes(answers.cmppakage, 'javascripts'))) {this.props.javascripts = false}
            // this.log(_a);
            done();
        }.bind(this));
    },

    

    //Copy application files
    app: function() {
      var lowCasedName = nameResolver.toLowerCaseWithoutSpec(this.props.variableName);
      var clientlibs = lowCasedName + "libs";

      if (this.props.javascripts) {
        this.fs.copyTpl(
          this.templatePath('js/_modal_js-init.js'),
          this.destinationPath('src/scripts/components/' + this.props.variableName + "/" + this.props.variableName + '-init.js'), this.props
        );

        this.fs.copyTpl(
          this.templatePath('js/_modal_js-controller.js'),
          this.destinationPath('src/scripts/components/' + this.props.variableName + "/" + this.props.variableName + '-controller.js'), this.props
        );
      }

      if (this.props.pug) {
        this.fs.copyTpl(
          this.templatePath('pug/modal-tpl.pug'),
          this.destinationPath('src/pug/components/' + '_cmp-' + this.props.variableName + '.pug'), this.props
        );
      }

      if (this.props.styl) {
        this.fs.copyTpl(
          this.templatePath('styl/modal-tpl.styl'),
          this.destinationPath('src/styles/components/' + '_cmp-' + this.props.variableName + '.styl'), this.props
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