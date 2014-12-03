define( [
    './ga' , './settings' , './apis/baidu' , './apis/youdao' , './apis/google'
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
            ts : function ( appId , query , cb ) {
                if ( !appId ) {
                    appId = config.defaultApi;
                }
                ga.push( [ '_trackEvent' , '展示次数' , '使用' + appId + '翻译次数' ] );

                if ( !query.hasOwnProperty( 'to' ) ) {
                    query.to = config.defaultTo;
                }
                apis[ appId ].translate( query , function ( resultObj ) {
                    cb( resultObj );
                } );
                return this;
            } ,
            speak : function ( appId , text , lang ) {
                if ( !appId ) {
                    appId = config.defaultSpeak;
                }
                ga.push( [ '_trackEvent' , '朗读次数' , '使用' + appId + '朗读次数' ] );
                apis[ appId ].speakUrl( text , lang , function ( audioUrl ) {
                    if ( audioUrl ) {
                        audio.src = audioUrl;
                        audio.play();
                    } else {

                        // 万能的google
                        context.speak( 'google' , text );
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

    Array.prototype.slice.call( arguments , 2 ).forEach( function ( api ) {
        apis[ api.id ] = api;
    } );

    return Object.freeze( context );
} );
