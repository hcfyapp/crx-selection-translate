import chromeCall from 'chrome-call';

const CLIENT_ID = '9072c87bd2a4b1188f3f'

chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
    switch (request.action) {
        case 'shanbay_save_token':
            let hash = request.data
            let token = hash.access_token
            let expired_at = new Date(new Date().getTime() + hash.expires_in * 1000)
            chromeCall('storage.local.set', { access_token: token, expired_at: expired_at })
                .then((res) => {
                    sendReponse()
                })
            break;
        case 'shanbay_authorize':
            let authorize_url = `https://api.shanbay.com/oauth2/authorize/?client_id=${CLIENT_ID}&response_type=token`
            window.open(authorize_url)
            sendReponse()
            break;
        case 'shanbay_clear_token':
            chromeCall('storage.local.set', { access_token: null })
                .then((res) => {
                    sendReponse()
                })
            break;
        case 'shanbay_get_token':
            chromeCall('storage.local.get', ['access_token', 'expired_at'])
                .then((res) => {
                    sendReponse(res)
                })
            break;
        default:
            break;
    }
    return true
})