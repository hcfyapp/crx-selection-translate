import ShanbayOauth from '../public/lib/shanbay_oauth2'

var oauth = ShanbayOauth.initPage();

function logout(){
    oauth.clearToken();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendReponse){
    if (request.action == 'shanbay_authorize'){
        oauth.authorize(sendReponse);
        return true
    }
})