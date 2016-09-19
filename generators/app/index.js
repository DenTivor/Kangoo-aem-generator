'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var nameResolver = require('./utils/name-resolver');
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
            message: 'Your project name',
            //Defaults to the project's folder name if the input is skipped
            default: this.appname
        },
        {
            type: 'checkbox',
            message: 'Select elements for module',
            name: 'cmppakage',
            choices: [
              {
                name: 'dialog'
              },
              {
                name: 'css'
              },
              {
                name: 'javascripts'
              },
              {
                name: 'parsys',
                disabled: 'To be in future'
              }
            ]
          },
          {
            type: 'list',
            message: 'Select element group',
            name: 'cmpgroup',
            choices: [
              {
                name: 'general',
                value: 'Elbrus general components'
              },
              {
                name: 'grid',
                value: 'Elbrus grid components'
              },
              {
                name: 'forms',
                value: 'Elbrus forms components'
              }
            ]
          }


        ];
 
        this.prompt(prompts, function (answers) {
            this.props = answers;

            this.props.variableName = this.props.name;
            this.props.groupName = this.props.cmpgroup;
            this.props.jsVarsName = nameResolver.toCamel(this.props.name);// someProject
            this.props.humanReadableName = _.capitalize(nameResolver.toHumanReadableName(this.props.name));// Some project
            this.props.varUnderName = nameResolver.toLowerUnderscore(this.props.name);//some_project

            this.props.dialog = true;
            this.props.css = true;
            this.props.javascripts = true;
            this.props.parsys = true;

            if (!(_.includes(answers.cmppakage, 'dialog'))) {this.props.dialog = false}
            if (!(_.includes(answers.cmppakage, 'css'))) {this.props.css = false}
            if (!(_.includes(answers.cmppakage, 'javascripts'))) {this.props.javascripts = false}
            if (!(_.includes(answers.cmppakage, 'parsys'))) {this.props.parsys = false}
            // this.log(_a);
            done();
        }.bind(this));
    },

    

    //Copy application files
    app: function() {
      var lowCasedName = nameResolver.toLowerCaseWithoutSpec(this.props.variableName);
      var clientlibs = lowCasedName + "libs";

      if (this.props.dialog) {
        this.fs.copyTpl(
          this.templatePath('_dialog.xml'),
          this.destinationPath(this.props.variableName + '/dialog.xml'), this.props
        );

        this.fs.copyTpl(
          this.templatePath('_cq_dialog/.content.xml'),
          this.destinationPath(this.props.variableName + "/_cq_dialog/.content.xml"), this.props
        );

        this.fs.copyTpl(
          this.templatePath('_cq_template/.content.xml'),
          this.destinationPath(this.props.variableName + '/_cq_template/.content.xml'), this.props
        );
      }

      if (this.props.css) {
        this.fs.copyTpl(
          this.templatePath('clientlibs/_css.txt'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/css.txt'), this.props
        );

        this.fs.copyTpl(
          this.templatePath('clientlibs/css/_cmp_styles-main.css'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/css/' + this.props.name + '-main.css'), this.props
        );
      }

      if (this.props.javascripts) {
        this.fs.copyTpl(
          this.templatePath('clientlibs/_js.txt'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/js.txt'), this.props
        );


        this.fs.copyTpl(
          this.templatePath('clientlibs/js/_cmp_js-preinit.js'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/js/' + this.props.name + '-preinit.js'), this.props
        );

        this.fs.copyTpl(
          this.templatePath('clientlibs/js/_cmp_js-init.js'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/js/' + this.props.name + '-init.js'), this.props
        );

        this.fs.copyTpl(
          this.templatePath('clientlibs/js/_cmp_js-controller.js'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/js/' + this.props.name + '-controller.js'), this.props
        );
      }

      if (this.props.css || this.props.javascripts) {
        this.fs.copyTpl(
          this.templatePath('clientlibs/.content.xml'),
          this.destinationPath(this.props.variableName + '/'+ clientlibs + '/.content.xml'), this.props
        );
      }

      if (!this.props.dialog) {
        this.fs.copyTpl(
          this.templatePath('_cmp_markup-without-dialog.html'),
          this.destinationPath(this.props.variableName + "/" + this.props.name + '.html'), this.props
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('_cmp_markup.html'),
          this.destinationPath(this.props.variableName + "/" + this.props.name + '.html'), this.props
        );
      }


      this.fs.copyTpl(
        this.templatePath('_content.xml'),
        this.destinationPath(this.props.variableName + '/.content.xml'), this.props
      );
    },
    
    //Install Dependencies
    install: function() {
      // this.installDependencies();
    }
  },
});


// https://scotch.io/tutorials/create-a-custom-yeoman-generator-in-4-easy-steps