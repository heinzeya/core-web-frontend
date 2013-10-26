'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'public',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({

    yeoman: yeomanConfig,

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      ci: {
        options: {
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'results/jshint-result.xml'
        }
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/**/*.js',
        '!<%= yeoman.app %>/{bower_components,vendor}/**/*'
      ]
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }

  });

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

};
