!function(e){function t(s){if(a[s])return a[s].exports;var n=a[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var a={};t.m=e,t.c=a,t.i=function(e){return e},t.d=function(e,a,s){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/asset/",t(t.s=3)}([function(e,t){e.exports=Vue},function(e,t){e.exports=jQuery},function(e,t,a){"use strict";function s(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[null,""])[1].replace(/\+/g,"%20"))||null}function n(e){var t=document.getElementById(e),a=function(){t.play(),document.removeEventListener("touchstart",a,!1)};t.play(),document.addEventListener("WeixinJSBridgeReady",function(){a()},!1),document.addEventListener("YixinJSBridgeReady",function(){a()},!1),document.addEventListener("touchstart",a,!1)}Object.defineProperty(t,"__esModule",{value:!0}),t.getURLParameter=s,t.audioAutoPlay=n},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(1),n=a.n(s),i=a(0),r=a.n(i),o=a(2);n()(function(){new r.a({el:"#app1",data:{time:60,bacNum:10,score:0,clickOneScore:4,gameOver:!1,startY:0,startX:0,endY:0,endX:0,showResultModal:!1,timer:{},isBegain:!1,animatedIndex:-1,list:[],sweepList:[3,2,2,3,1,3,2,3,2,4]},watch:{score:function(){0===this.score?n()("#gameBg").attr("src","./asset/images/game-bg1.jpg"):10===this.score?n()("#gameBg").attr("src","./asset/images/game-bg2.jpg"):20===this.score?n()("#gameBg").attr("src","./asset/images/game-bg3.jpg"):30===this.score?n()("#gameBg").attr("src","./asset/images/game-bg4.jpg"):40===this.score?n()("#gameBg").attr("src","./asset/images/game-bg5.jpg"):50===this.score?n()("#gameBg").attr("src","./asset/images/game-bg6.jpg"):60===this.score?n()("#gameBg").attr("src","./asset/images/game-bg7.jpg"):70===this.score?n()("#gameBg").attr("src","./asset/images/game-bg8.jpg"):80===this.score?n()("#gameBg").attr("src","./asset/images/game-bg9.jpg"):90===this.score?n()("#gameBg").attr("src","./asset/images/game-bg11.jpg"):100===this.score&&(n()("#gameBg").attr("src","./asset/images/game-bg10.jpg"),this.showResultModal=!0,this.gameOver=!0)},time:function(){this.time<=0&&(clearInterval(this.timer),this.showResultModal=!0,this.gameOver=!0)}},created:function(){var e=this;setTimeout(function(){e.initGetAll(),e.initBact(),e.addAnimate()},300)},methods:{addAnimate:function(){var e=this;setInterval(function(){e.animatedIndex++,e.animatedIndex>4&&(e.animatedIndex=0),0===e.animatedIndex?(n()("#img_4").removeClass("right"),n()("#img_"+e.animatedIndex).addClass("touch")):1===e.animatedIndex?(n()("#img_0").removeClass("touch"),n()("#img_"+e.animatedIndex).addClass("top")):2===e.animatedIndex?(n()("#img_1").removeClass("top"),n()("#img_"+e.animatedIndex).addClass("bottom")):3===e.animatedIndex?(n()("#img_2").removeClass("bottom"),n()("#img_"+e.animatedIndex).addClass("left")):4===e.animatedIndex&&(n()("#img_3").removeClass("left"),n()("#img_"+e.animatedIndex).addClass("right"))},1e3)},againGame:function(){n()("#barsBox").html(""),this.bacNum=10,this.time=60,this.showResultModal=!1,this.isBegain=!1,this.score=0,this.list=[],this.clickOneScore=4,this.initGetAll(),this.initBact(),this.addAnimate(),this.gameOver=!1},randomBlock:function(){for(var e=[],t=0;t<this.bacNum;t++){var a=parseInt(12*Math.random()+1);-1==e.findIndex(function(e,t,s){return e===a})?e.push(a):t--}return e},initGetAll:function(){var e=this.randomBlock(),t=this;e.forEach(function(e,a){var s=parseInt(4*Math.random())+1,i=parseInt(10*Math.random()),r=parseInt(15*Math.random()),o=t.sweepList[a],c=parseInt(50*Math.random()+10),m="";0===a&&(m=' <img id="tipImg" src="./asset/images/swipe_touch_5.png" class="top" style="width: 0.5rem; height: 0.5rem;bottom: '+r+"px; left: "+i+'px;position:absolute;z-index:3" alt="">');var g='<div class="bar-box-'+e+'">'+m+'<img name="bacteria" id="'+a+'" style="transform: rotate('+c+"deg); -webkit-transform: rotate("+c+"deg); bottom: "+r+"px; left: "+i+'px;" src="./asset/images/bacteria'+s+'.png" class="bacteria bacteria-img'+s+'"></div>';n()("#barsBox").append(g),n()("#app1").fadeIn(),t.list.push({num:o,all:o})})},initBact:function(){var e=this;n()('img[name="bacteria"]').on("touchstart",function(t){e.startY=t.originalEvent.changedTouches[0].pageY,e.startX=t.originalEvent.changedTouches[0].pageX,n()("#mineBrush").show(),n()("#mineBrush").css("left",parseFloat(t.originalEvent.changedTouches[0].pageX)-10),n()("#mineBrush").css("top",parseFloat(t.originalEvent.changedTouches[0].pageY)-20)}),n()('img[name="bacteria"]').on("touchend",function(t){e.endY=t.originalEvent.changedTouches[0].pageY,e.endX=t.originalEvent.changedTouches[0].pageX,n()("#mineBrush").hide(),e.startX>e.endX+30?(console.log("向左滑动"),e.correntKill(t)):e.startX<e.endX-30?(console.log("向右滑动"),e.correntKill(t)):e.endY<e.startY-30?(console.log("向上滑动"),e.correntKill(t)):e.endY>e.startY+30&&(console.log("向下滑动"),e.correntKill(t))})},correntKill:function(e){n()("#tipImg").css("display","none");var t=this;n()("#mineBrush").addClass("brushing-up"),n()("#mineBrush").show(),n()("#mineBrush").css("z-index","19"),o.audioAutoPlay("brushingMusic");var t=this;setTimeout(function(){t.score+=t.clickOneScore;var a=e.target.id,s=parseInt(t.list[a].all),i=t.list[a].num-1,r=parseInt(i)/s;t.list[a].num=i,e.target.style.opacity=r,i<=0&&(e.target.style.display="none",e.target.parentElement.style.display="none"),n()("#mineBrush").css("z-index","9"),n()("#mineBrush").hide(),n()("#mineBrush").removeClass("brushing-up")},800)},beginGame:function(){var e=this;this.isBegain=!0,this.timer=setInterval(function(){e.time--},1e3)}}})})}]);