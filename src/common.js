// 获取URL指定的某个参数
export function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
export function audioAutoPlay(id) {
    var audio = document.getElementById(id),
        play = function () {
            audio.play();
            document.removeEventListener("touchstart", play, false);
        };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
        play();
    }, false);
    document.addEventListener("touchstart", play, false);
} 
