import watcher from '../public/storage-watcher';
import chromeCall from 'chrome-call';

const viewerPath = chrome.runtime.getURL( '/pdf-viewer/web/viewer.html' );

export function redirect2viewer( details ) {
  return {
    redirectUrl: viewerPath + '?file=' + encodeURIComponent( details.url )
  };
}

export let enabled = false;

function enable() {
  if ( enabled ) {
    return;
  }
  enabled = true;
  chrome.webRequest.onBeforeRequest.addListener(
    redirect2viewer,
    {
      urls: [
        '*://*/*.pdf',
        '*://*/*.PDF'
      ],
      types: [ 'main_frame', 'sub_frame' ]
    },
    [ 'blocking' ]
  );
}

function disable() {
  if ( !enabled ) {
    return;
  }
  enabled = false;
  chrome.webRequest.onBeforeRequest.removeListener(
    redirect2viewer,
    {
      urls: [
        '*://*/*.pdf',
        '*://*/*.PDF'
      ],
      types: [ 'main_frame', 'sub_frame' ]
    },
    [ 'blocking' ]
  );
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
