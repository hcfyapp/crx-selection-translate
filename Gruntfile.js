module.exports = function ( grunt ) {
    'use strict';

    // 如果开启了 r.js 连接工具，那么应该是 'build-require'
    // 否则应该是 'src'
    var source = 'src';

    grunt.initConfig( {

        clean : {
            main : {
                src : [ 'build' ]
            } ,
            after : {
                src : [ source === 'src' ? '' : source ] // 可别误删了
            }
        } ,

        uglify : {

            dynamic : {
                files : [
                    {
                        expand : true ,
                        cwd : source ,
                        src : [ '**/*.js' , '!**/google_cn.js' ] , // 暂时忽略旧的谷歌接口
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
                        cwd : source ,
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
                        cwd : source ,
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
                        cwd : source ,
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
                        cwd : source ,
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
                        'js/lib/jquery' : 'empty:' ,
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
        'clean:main' , /*'requirejs' ,*/ 'uglify' , 'cssmin' , 'htmlmin' , 'imagemin' , 'copy' /*, 'clean:after'*/
    ] );
};
