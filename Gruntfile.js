/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gruntfile: {
            src: 'Gruntfile.js'
        },

        topcoat: {
            options: {
                repos: '<%= pkg.topcoat %>',
                src: 'tmp/src',
                controlsPath: '<%= topcoat.options.src %>/controls',
                skinsPath: '<%= topcoat.options.src %>/skins',
                themePath: '<%= topcoat.options.src %>/theme',
                utilsPath: '<%= topcoat.options.src %>/utils',
            },
            download: {
                options: {
                    hostname: 'https://github.com/',
                    proxy: '',
                    download: true,
                    compile: false
                }
            }
        },

        unzip: {
            utils: {
                src: 'tmp/src/utils/*.zip',
                dest: 'tmp/src/utils'
            }
        },

        clean: {
            tmp: ['tmp'],
            zip: ['tmp/src/*.zip', 'tmp/src/utils/*.zip']
        },

        compile: {
            stylus: {
                options: {
                    import: ['button-mixin', 'utils'],
                    compress: false
                },
                files: {
                    'release/css/button.css': ['src/copyright.styl', 'src/button.styl']
                }
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'release/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'release/css/',
                ext: '.min.css'
            }
        },

        jade: {
            compile: {
                expand: true,
                cwd: 'test/perf',
                src: ['*.jade'],
                dest: 'test/perf/',
                ext: '.test.html'
            }
        },

        nodeunit: {
            tests: ['test/*.test.js']
        },

        watch: {
            files: 'src/*.styl',
            tasks: ['build']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-topcoat');
    grunt.loadNpmTasks('grunt-zip');

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['clean', 'topcoat', 'build']);
    grunt.registerTask('build', ['compile', 'cssmin', 'jade', 'nodeunit']);

};
