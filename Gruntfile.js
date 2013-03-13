/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        gruntfile: {
            src: 'Gruntfile.js'
        },
        clean: ["tmp", "release"],
        concat: {
            merge: {
                src: ['src/button-base.css', 'src/button.css'],
                dest: 'tmp/button.css'
            },
            copyright: {
                files: {
                    'release/button.css': ['src/copyright.css', 'release/button.css'],
                    'release/button-min.css': ['src/copyright.css', 'release/button-min.css'],
                }
            }
        },
        rework: {
            compile: {
                files: {
                    'release/button.css': ['tmp/button.css'],
                },
                options: {
                    toString: {
                        compress: false
                    },
                    use: [
                        ['rework.extend']
                    ]
                },
            },
            minify: {
                files: {
                    'release/button-min.css': ['release/button.css']
                },
                options: {
                    toString: {
                        compress: true
                    }
                },
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        },
        watch: {
            files: 'src/*.css',
            tasks: ['default']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-rework');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat:merge', 'rework', 'concat:copyright', 'nodeunit']);

};
