module.exports = function ( grunt ) {
    'use strict';

    grunt.initConfig( {

        clean : {
            main : {
                src : [ 'build' ]
            } ,
            after : {
                src : [ 'build-require' ]
            }
        } ,

        uglify : {

            dynamic : {
                files : [
                    {
                        expand : true ,
                        cwd : 'build-require/' ,
                        src : [ '**/*.js' , '!**/google_cn.js' ] , // 忽略旧的谷歌接口
                        dest : 'build/'
                    }
                ]
            }
        } ,

        cssmin : {
            dynamic : {
                files : [
                    {
                        expand : true ,
                        cwd : 'build-require/' ,
                        src : [ '**/*.css' ] ,
                        dest : 'build/'
                    }
                ]
            }
        } ,

        htmlmin : {
            dist : {
                options : {
                    removeComments : true ,
                    collapseWhitespace : true
                } ,
                files : [
                    {
                        expand : true ,
                        cwd : 'build-require/' ,
                        src : '**/*.html' ,
                        dest : 'build/'
                    }
                ]
            }
        } ,

        imagemin : {
            dynamic : {
                files : [
                    {
                        expand : true ,
                        cwd : 'build-require/' ,
                        src : [ '**/*.{png,jpg,gif}' ] ,
                        dest : 'build/'
                    }
                ]
            }
        } ,

        copy : {
            main : {
                files : [
                    {
                        expand : true ,
                        cwd : 'build-require/' ,
                        src : [
                            '**/*.*' , '!**/*.{js,css,html,png,jpg,gif,txt}'
                        ] ,
                        dest : 'build/'
                    }
                ]
            }
        } ,

        requirejs : {

            all : {
                options : {

                    appDir : './src' ,
                    baseUrl : './' ,
                    paths : {
                        'js/lib/L' : 'empty:' ,
                        'js/lib/doT' : 'empty:'
                    } ,
                    removeCombined : true ,
                    optimize : 'none' ,
                    optimizeCss : 'none' ,
                    dir : './build-require' ,
                    modules : [
                        {
                            name : 'js/bg'
                        } ,
                        {
                            name : 'js/options'
                        }
                    ]
                }
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );

    grunt.registerTask( 'default' , [
        'clean:main' , 'requirejs' , 'uglify' , 'cssmin' , 'htmlmin' , 'imagemin' , 'copy' , 'clean:after'
    ] );
};
