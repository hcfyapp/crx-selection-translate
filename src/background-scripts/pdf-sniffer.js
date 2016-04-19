import watcher from '../public/storage-watcher';

const { webRequest } = chrome;

const viewerPath = chrome.runtime.getURL( '/pdf-viewer/web/viewer.html' );

function getViewerURL( pdfUrl ) {
  return viewerPath + '?file=' + encodeURIComponent( pdfUrl );
}

/**
 * ftp:// 协议直接跳转到 viewer 就好
 * @param details
 * @returns {chrome.webRequest.BlockingResponse}
 */
export function onBeforeRequestForFTPAndFile( details ) {
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

export let enabled = false;

// 开启 pdf 翻译
function enable() {
  if ( enabled ) {
    return;
  }
  enabled = true;
  webRequest.onBeforeRequest.addListener(
    onBeforeRequestForFTPAndFile,
    {
      urls: [
        'ftp://*/*.pdf',
        'ftp://*/*.PDF',
        'file://*/*.pdf',
        'file://*/*.PDF'
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
}

// 关闭 pdf 翻译
function disable() {
  if ( !enabled ) {
    return;
  }
  enabled = false;
  webRequest.onBeforeRequest.removeListener( onBeforeRequestForFTPAndFile );
  webRequest.onHeadersReceived.removeListener( onHeadersReceivedForHTTP );
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
  watcher( 'pdf', onStorageChanged );
}
