module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'shell': {
      transformTest: {
        command: 'node node_modules/6to5/bin/6to5/index.js test --out-dir .tmp/test'
      },
      transformSrc: {
        command: 'node node_modules/6to5/bin/6to5/index.js src --out-dir .tmp/src'
      }
    },
    clean: {
      src: ['.tmp/src'],
      test: ['.tmp/test'],
      all: ['.tmp']
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
          base: ['demo', 'bower_components', '.tmp'],
          open: true
        }
      }
    }

  });


  grunt.registerTask('test', ['clean:all', 'shell:transformSrc', 'shell:transformTest', 'karma:unit', 'clean:all']);
  grunt.registerTask('serve', ['clean:src', 'shell:transformSrc', 'connect:dev']);

}