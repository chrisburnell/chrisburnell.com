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
            }
        },

        cssmin: {
            all: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },

        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**.*.{png,jpg,gif}'],
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
                files: ['css/*.scss', '_posts/*.md', 'images/*'],
                tasks: ['newer:sass', 'newer:cssmin', 'newer:imagemin', 'newer:svgmin']
            }
        },

    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-newer');

    // Register Tasks
    grunt.registerTask('default', ['newer:sass', 'newer:cssmin']);
};