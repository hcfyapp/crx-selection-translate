/**
 * 监听扇贝授权成功回调
 */
let location = window.location
if (location.host == 'api.shanbay.com' && location.pathname.indexOf('/oauth2/auth/success') != -1) {
    let hash = location.hash.slice(1)
    hash = JSON.parse('{"' + decodeURI(hash).replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    chrome.runtime.sendMessage({ action: 'shanbay_save_token', data: hash }, function (response) {
        window.close()
    });
}
