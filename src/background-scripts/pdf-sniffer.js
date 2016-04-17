// todo 代码里注释掉了使用 webNavigation 捕捉 file:// 协议的代码,
// 因为新增一个 webNavigation 会导致更新后被 Chrome 停用的情况,
// 需要使用 optional permissions
// @see https://developer.chrome.com/extensions/permissions

import watcher from '../public/storage-watcher';
import chromeCall from 'chrome-call';

const { webRequest, webNavigation } = chrome;

const viewerPath = chrome.runtime.getURL( '/pdf-viewer/web/viewer.html' );

function getViewerURL( pdfUrl ) {
  return viewerPath + '?file=' + encodeURIComponent( pdfUrl );
}

/**
 * ftp:// 协议直接跳转到 viewer 就好
 * @param details
 * @returns {chrome.webRequest.BlockingResponse}
 */
export function onBeforeRequestForFTP( details ) {
  return {
    redirectUrl: getViewerURL( details.url )
  };
}

/**
 * http(s) 协议需要通过响应头判断响应是否是一个 PDF 文档
 * @param details
 * @returns {chrome.webRequest.BlockingResponse}
 */
export function onHeadersReceivedForHTTP( details ) {
  if ( details.method !== 'GET' ) {
    return;
  }

  let contentType;
  details.responseHeaders.some( ( h )=> {
    if ( h.name.toLowerCase() === 'content-type' ) {
      contentType = h.value;
      return true;
    }
  } );
  if ( !contentType ) {
    return;
  }

  contentType = contentType.toLowerCase().split( ';', 1 )[ 0 ].trim();
  if ( contentType === 'application/pdf' ||
    contentType === 'application/octet-stream' &&
    details.url.toLowerCase().indexOf( '.pdf' ) > 0 ) {
    return {
      redirectUrl: getViewerURL( details.url )
    };
  }
}

/**
 * webRequest 不会捕捉 file:// 协议,只能使用 webNavigation 了
 * @param details
 */
export function onBeforeNavigateForFile( details ) {
  if ( details.frameId === 0 ) {
    chrome.tabs.update( details.tabId, {
      url: getViewerURL( details.url )
    } );
  }
}

export let enabled = false;

// 开启 pdf 翻译
function enable() {
  if ( enabled ) {
    return;
  }
  enabled = true;
  webRequest.onBeforeRequest.addListener(
    onBeforeRequestForFTP,
    {
      urls: [
        'ftp://*/*.pdf',
        'ftp://*/*.PDF'
      ],
      types: [ 'main_frame', 'sub_frame' ]
    },
    [ 'blocking' ]
  );

  webRequest.onHeadersReceived.addListener(
    onHeadersReceivedForHTTP,
    {
      urls: [ 'http://*/*', 'https://*/*' ],
      types: [ 'main_frame', 'sub_frame' ]
    },
    [ 'blocking', 'responseHeaders' ]
  );

  // webNavigation.onBeforeNavigate.addListener( onBeforeNavigateForFile, {
  //   url: [
  //     {
  //       urlPrefix: 'file://',
  //       pathSuffix: '.pdf'
  //     }, {
  //       urlPrefix: 'file://',
  //       pathSuffix: '.PDF'
  //     }
  //   ]
  // } );
}

// 关闭 pdf 翻译
function disable() {
  if ( !enabled ) {
    return;
  }
  enabled = false;
  webRequest.onBeforeRequest.removeListener( onBeforeRequestForFTP );
  webRequest.onHeadersReceived.removeListener( onHeadersReceivedForHTTP );
  // webNavigation.onBeforeNavigate.removeListener( onBeforeNavigateForFile );
}

function onStorageChanged( items ) {
  if ( items.pdf ) {
    enable();
  } else {
    disable();
  }
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  watcher( 'pdf', 'local', onStorageChanged );
  chromeCall( 'storage.local.get', { pdf: true } )
    .then( onStorageChanged );
}
