'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var nameResolver = require('./utils/name-resolver');


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
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        },
        {
            type: 'checkbox',
            message: 'Select elements for module',
            name: 'cmppakage',
            choices: [
              {
                name: 'Dialog'
              },
              {
                name: 'Css'
              },
              {
                name: 'JS scripts'
              },
              {
                name: 'Parsys',
                disabled: 'To be in future'
              }
            ]
          }


        ];
 
        this.prompt(prompts, function (answers) {
            this.props = answers;

            this.props.variableName = this.props.name;
            this.props.jsVarsName = nameResolver.toCamel(this.props.name);// someProject
            this.props.humanReadableName = nameResolver.toHumanReadableName(this.props.name);// some project
            this.props.varUnderName = nameResolver.toLowerUnderscore(this.props.name);//some_project


            this.log(answers.cmppakage);
            done();
        }.bind(this));
    },

    

    //Copy application files
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_dialog.xml'),
        this.destinationPath(this.props.variableName + '/dialog.xml'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('_content.xml'),
        this.destinationPath(this.props.variableName + '/.content.xml'), this.props
      );


      this.fs.copyTpl(
        this.templatePath('_cmp_markup.html'),
        this.destinationPath(this.props.variableName + "/" + this.props.name + '.html'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/.content.xml'),
        this.destinationPath(this.props.variableName + '/clientlibs/.content.xml'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/_js.txt'),
        this.destinationPath(this.props.variableName + '/clientlibs/js.txt'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/_css.txt'),
        this.destinationPath(this.props.variableName + '/clientlibs/css.txt'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/js/_cmp_js-preinit.js'),
        this.destinationPath(this.props.variableName + '/clientlibs/js/' + this.props.name + '-preinit.js'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/js/_cmp_js-init.js'),
        this.destinationPath(this.props.variableName + '/clientlibs/js/' + this.props.name + '-init.js'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/js/_cmp_js-controller.js'),
        this.destinationPath(this.props.variableName + '/clientlibs/js/' + this.props.name + '-controller.js'), this.props
      );

      this.fs.copyTpl(
        this.templatePath('clientlibs/css/_cmp_styles-main.css'),
        this.destinationPath(this.props.variableName + '/clientlibs/css/' + this.props.name + '-main.css'), this.props
      );





    //   //Server file
    //   this.fs.copyTpl(
    //     this.templatePath('_server.js'),
    //     this.destinationPath('server.js'),
    //     this.destinationPath('/views/index.ejs'), {
    //       name: this.props.name
    //     }
    //   );
    //   /////Routes
    //   this.fs.copy(
    //     this.templatePath('_routes/_all.js'),
    //     this.destinationPath('routes/all.js'));


    //   // Model
    //   this.fs.copy(
    //     this.templatePath('_model/_todo.js'),
    //     this.destinationPath('model/todo.js'));

    //   // Views
    //   this.fs.copyTpl(
    //     this.templatePath('_views/_index.ejs'),
    //     this.destinationPath('/views/index.ejs'), {
    //       name: this.props.name
    //     }
    //   );

    //   // Public/
    //   this.fs.copy(
    //     this.templatePath('_public/_css/_app.css'),
    //     this.destinationPath('public/css/app.css')
    //   );
    //   this.fs.copy(
    //     this.templatePath('_public/_js/_app.js'),
    //     this.destinationPath('public/js/app.js')
    //   );
    },
    
    //Install Dependencies
    install: function() {
      // this.installDependencies();
    }
  },
});


// https://scotch.io/tutorials/create-a-custom-yeoman-generator-in-4-easy-steps