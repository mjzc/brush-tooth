function ScrollImgLeft() {
    var speed = 50;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML = scroll_begin.innerHTML;
    function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
            scroll_div.scrollLeft -= scroll_begin.offsetWidth;
            console.log(3)   
        } else {
            scroll_div.scrollLeft++;
            console.log(4)   
        }
    }
    var MyMar = setInterval(Marquee, speed);
    scroll_div.onmouseover = function () { clearInterval(MyMar); }
    scroll_div.onmouseout = function () { MyMar = setInterval(Marquee, speed); }
}

export function init(){
    console.log(1)
    ScrollImgLeft()
}