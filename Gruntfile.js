module.exports = function ( grunt ) {
    'use strict';

    // 项目配置
    grunt.initConfig( {

        clean : {
            main : {
                src : [ 'build' ]
            } ,
            after : {
                src : [ 'build-require' ]
            }
        } ,

        // 精简js
        uglify : {

            dynamic : {
                files : [
                    {
                        expand : true , //启用动态扩展
                        cwd : 'build-require/' , //批匹配相对lib目录的src来源
                        src : [ '**/*.js' , '!**/google_cn.js' , '!**/donate.js' , '!**/menu.js' ] , // 忽略旧的谷歌接口
                        dest : 'build/' //目标路径前缀
                    }
                ]
            }
        } ,

        // 精简css
        cssmin : {
            dynamic : {
                files : [
                    {
                        expand : true , //启用动态扩展
                        cwd : 'build-require/' , //批匹配相对lib目录的src来源
                        src : [ '**/*.css' ] , // 不包括global类文件
                        dest : 'build/' //目标路径前缀
                    }
                ]
            }
        } ,

        // 用于精简模板
        htmlmin : {
            dist : {
                options : {
                    removeComments : true ,
                    collapseWhitespace : true
                } ,
                files : [
                    {
                        expand : true , //启用动态扩展
                        cwd : 'build-require/' ,
                        src : '**/*.html' ,
                        dest : 'build/' // 目标路径前缀
                    }
                ]
            }
        } ,

        // 精简png、jpg和gif
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

        // 复制其它文件
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
                        'js/lib/doT' : 'empty:' ,
                        'js/module/settings' : 'empty:'
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

    // 加载各种必需的插件
    grunt.loadNpmTasks( 'grunt-contrib-uglify' ); // 精简js
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' ); // 精简css
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' ); // 精简html
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' ); // 精简图片
    //grunt.loadNpmTasks( 'grunt-push-svn' ); // 提交至svn
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' ); // 合并模块
    grunt.loadNpmTasks( 'grunt-contrib-copy' ); // 复制文件
    grunt.loadNpmTasks( 'grunt-contrib-clean' ); // 删除文件或文件夹

    grunt.registerTask( 'default' , [
        'clean:main' , 'requirejs' , 'uglify' , 'cssmin' , 'htmlmin' , 'imagemin' , 'copy' , 'clean:after'
    ] );
};
