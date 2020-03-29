function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger'
}

function isPCWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase()
    return ua.match(/windowswechat/i) == 'windowswechat'
}

function redirectIfNotWeiXin() {
    if (!isWeiXin() || isPCWeiXin()) {
        window.location.replace('http://yun.zhdiy.com/fzth/sakura/game/Js34xA')
    }
}

function checkPreload(version) {
    if (!window.localStorage.getItem('isJSPreLoadedbl' + version)) {
        window.location.replace('preload.html?fromUrl='
            + encodeURIComponent(window.location.href))
    }
}

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return false
    } else {
        return true
    }
  }

// redirectIfNotWeiXin()

;(function (win, doc) {
    // var ASSERT_VERSION = '2'
    // checkPreload(ASSERT_VERSION)
    var isPC = browserRedirect()
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var init = function () {
        var windowWidth = docEl.clientWidth
        if (!windowWidth) return
        if (isPC) {
            docEl.style.fontSize = 64 + 'px'
        } else {
            docEl.style.fontSize = windowWidth / 6.4 + 'px'
        }
    }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, init, false)
    doc.addEventListener('DOMContentLoaded', init, false)
})(window, document)