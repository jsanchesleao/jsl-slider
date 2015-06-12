module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'shell': {
      transformTest: {
        command: 'node_modules/.bin/babel test --out-dir .tmp/test'
      },
      transformSrc: {
        command: 'node node_modules/.bin/babel src --out-dir .tmp/src'
      }
    },
    clean: {
      src: ['.tmp/src'],
      test: ['.tmp/test'],
      all: ['.tmp'],
      dist: ['dist']
    },
    karma: {
      unit: {
        configFile: '.tmp/test/config/karma.conf.js'
      }
    },
    connect: {
      dev: {
        options: {
          port: 8001,
          keepalive: true,
          base: ['demo', 'bower_components', '.tmp', 'style'],
          open: true
        }
      }
    },
    bowerJson: grunt.file.readJSON('bower.json'),
    concat: {
      dist: {
        options: {
          banner: '(function(){\n"use strict";\n',
          footer: '}());',
          process: function(src, filepath) {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
        },
        src: ['.tmp/src/app.js', '.tmp/src/directive/**/*.js', '.tmp/src/service/**/*.js'],
        dest: 'dist/jsl-slider.js',
      },
    },
    uglify: {
      dist: {
        files: [{
          src: 'dist/jsl-slider.js',
          dest: 'dist/jsl-slider.min.js'
        }]
      }
    },
    copy: {
      distStyles: {
        src: 'style/jsl-slider.css',
        dest: 'dist/jsl-slider.css',
      },
    },
    cssmin: {
      dist: {
        files: {
          'dist/jsl-slider.min.css': ['dist/**/*.css']
        }
      }
    }

  });


  grunt.registerTask('test', ['clean:all', 'shell:transformSrc', 'shell:transformTest', 'karma:unit', 'clean:all']);
  grunt.registerTask('serve', ['clean:src', 'shell:transformSrc', 'connect:dev']);
  grunt.registerTask('build', [
    'clean:src',
    'clean:dist',
    'shell:transformSrc',
    'concat:dist',
    'uglify:dist',
    'copy:distStyles',
    'cssmin:dist',
    'clean:src']);

}
