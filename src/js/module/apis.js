define( [
    './ga' , './settings' ,

    // 翻译引擎列在下面
    './apis/baidu' , './apis/youdao' , './apis/google'
] , function ( ga , settings ) {
    "use strict";
    var audio = document.createElement( 'audio' ) ,

        config = {
            defaultApi : 'google' ,
            defaultSpeak : 'google' ,
            defaultTo : 'auto'
        } ,

        keys = Object.keys( config ) ,

        apis = {} ,

        context = {

            /**
             *
             * @param {object} query 查询对象，不能是字符串
             * @param {function} cb 回调，第一个参数为查询结果对象
             * @returns {context}
             */
            ts : function ( query , cb ) {
                var apiId = query.apiId || config.defaultApi;

                ga.push( [ '_trackEvent' , '展示次数' , '使用' + apiId + '翻译次数' ] );

                if ( !query.hasOwnProperty( 'to' ) ) {
                    query.to = config.defaultTo;
                }
                apis[ apiId ].translate( query , function ( resultObj ) {

                    resultObj.api = apis[ apiId ];
                    resultObj.query = query.text;
                    cb( resultObj );
                } );
                return this;
            } ,

            /**
             * 朗读
             * @param query
             * @param query.apiId
             * @param query.text
             * @param query.from
             */
            speak : function ( query ) {
                var apiId = query.apiId || config.defaultSpeak;

                ga.push( [ '_trackEvent' , '朗读次数' , '使用' + apiId + '朗读次数' ] );
                apis[ apiId ].speakUrl( query.text , query.from , function ( audioUrl ) {
                    if ( audioUrl ) {
                        audio.src = audioUrl;
                        audio.play();
                    } else {

                        // 万能的google
                        query.apiId = 'google';
                        context.speak( query );
                    }
                } );
            }
        };

    //audio.addEventListener( 'error' , function ( e ) {

    // todo 如何在播放出错的时候通知用户？
    //console.log( e );
    //} );

    // 读取设置
    settings.option( keys , function ( i ) {
        keys.forEach( function ( key ) {
            config[ key ] = i[ key ];
        } );
    } );

    // 设置变更
    chrome.storage.onChanged.addListener( function ( changes ) {
        keys.forEach( function ( key ) {
            if ( changes.hasOwnProperty( key ) ) {
                config[ key ] = changes[ key ].newValue;
            }
        } );
    } );

    // 绑定翻译引擎
    Array.prototype.slice.call( arguments , 2 ).forEach( function ( api ) {
        apis[ api.id ] = api;
    } );

    return Object.freeze( context );
} );
