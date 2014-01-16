module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            all: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.scss'],
                    dest: 'css/',
                    rename: function(dest, src) {
                        return dest + src.replace('scss', 'css');
                    }
                }]
            },
            build: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/ravenous.css': 'css/ravenous.scss'
                }
            }
        },

        csscomb: {
            all: {
                options: {
                    config: 'css/csscomb-config.json'
                },
                files: {
                    'css/ravenous.css': ['css/ravenous.css']
                }
            },
            build: {
                options: {
                    config: 'css/csscomb-config.json'
                },
                files: {
                    'css/ravenous.scss': ['css/ravenous.scss']
                }
            }
        },

        cssmin: {
            all: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            },
            build: {
                files: {
                    'css/ravenous.min.css': 'css/ravenous.css'
                }
            }
        },

        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/'
                }]
            }
        },

        svgmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['*.svg', '!*.min.svg'],
                    dest: 'images/',
                    ext: '.min.svg'
                }]
            }
        },

        watch: {
            all: {
                files: ['css/*.scss', 'css/ui/*.scss', '_posts/*.md', 'images/*'],
                tasks: ['newer:sass', 'newer:csscomb', 'newer:cssmin', 'newer:imagemin', 'newer:svgmin']
            },
            sass: {
                files: ['css/*.scss', 'css/ui/*.scss'],
                tasks: ['sass:build', 'csscomb:all', 'cssmin:build']
            }
        },

    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-newer');

    // Register Tasks
    grunt.registerTask('default', ['sass:build', 'csscomb:all', 'cssmin:build']);

};