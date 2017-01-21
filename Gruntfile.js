var grunt = require('grunt');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            production: {
                files: {
                    'dist/css/angular-mini-preview.min.css': ['src/css/angular-mini-preview.css'],
                    'demo/css/angular-mini-preview.min.css': ['src/css/angular-mini-preview.css']
                }
            }
        },

        uglify: {
            production: {
                files: {
                    'dist/js/angular-mini-preview.min.js': [
                        'src/js/angular-mini-preview.js'
                    ],
                    'demo/js/angular-mini-preview.min.js': [
                        'src/js/angular-mini-preview.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['cssmin', 'uglify']);
};