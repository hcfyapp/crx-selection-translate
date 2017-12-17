import chromeCall from 'chrome-call';
/**
 * 监听扇贝授权成功回调
 */
let location = window.location
if (location.host == 'api.shanbay.com' && location.pathname.indexOf('/oauth2/auth/success') != -1) {
    let hash = location.hash.slice(1)
    if (!hash) {
        window.close()
        alert('授权失败!')
    } else {
        hash = JSON.parse('{"' + decodeURI(hash).replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        let token = hash.access_token
        chromeCall('storage.local.set', { access_token: token })
            .then((res) => {
                window.close()
                alert('授权成功!')
            })
    }
}
