import $ from 'jquery'
import Vue from 'Vue'
var common = require('./common.js')


$(function () {
    // 整个游戏的总分100分，一共10个细菌，总共需要滑动20次，一次5分
    const totalscore = 100
    const totalBac = 10
    const totalSweep = 30
    const bacteriaNum = 10
    const gameTime = 60
    new Vue({
        el: '#app1',
        data: {
            time: gameTime,
            bacNum: totalBac,
            score: 0,
            clickOneScore: 4,
            gameOver: false,
            startY: 0,
            startX: 0,
            endY: 0,
            endX: 0,
            showResultModal: false,
            timer: {},
            isBegain: false,
            animatedIndex: -1,
            list: [],
            sweepList: [3, 2, 2, 3, 1, 3, 2, 3, 2, 4]
        },
        watch: {
            score: function () {
                if (this.score === 0) {
                    $('#gameBg').attr('src', './asset/images/game-bg1.jpg')
                } else if (this.score === 10) {
                    $('#gameBg').attr('src', './asset/images/game-bg2.jpg')
                } else if (this.score === 20) {
                    $('#gameBg').attr('src', './asset/images/game-bg3.jpg')
                } else if (this.score === 30) {
                    $('#gameBg').attr('src', './asset/images/game-bg4.jpg')
                } else if (this.score === 40) {
                    $('#gameBg').attr('src', './asset/images/game-bg5.jpg')
                } else if (this.score === 50) {
                    $('#gameBg').attr('src', './asset/images/game-bg6.jpg')
                } else if (this.score === 60) {
                    $('#gameBg').attr('src', './asset/images/game-bg7.jpg')
                } else if (this.score === 70) {
                    $('#gameBg').attr('src', './asset/images/game-bg8.jpg')
                } else if (this.score === 80) {
                    $('#gameBg').attr('src', './asset/images/game-bg9.jpg')
                } else if (this.score === 90) {
                    $('#gameBg').attr('src', './asset/images/game-bg11.jpg')
                } else if (this.score === 100) {
                    $('#gameBg').attr('src', './asset/images/game-bg10.jpg')
                    this.showResultModal = true
                    this.gameOver = true
                }
            },
            time: function () {
                if (this.time <= 0) {
                    clearInterval(this.timer)
                    this.showResultModal = true
                    this.gameOver = true
                }
            }
        },
        created: function () {
            var that = this
            setTimeout(function () {
                that.initGetAll()
                that.initBact()
                that.addAnimate()
            }, 300)
        },
        methods: {
            addAnimate: function () {
                var that = this
                setInterval(function () {
                    that.animatedIndex++
                    if (that.animatedIndex > 4) {
                        that.animatedIndex = 0
                    }
                    if (that.animatedIndex === 0) {
                        $('#' + 'img_4').removeClass('right')
                        $('#' + 'img_' + that.animatedIndex).addClass('touch')
                    } else if (that.animatedIndex === 1) {
                        $('#' + 'img_0').removeClass('touch')
                        $('#' + 'img_' + that.animatedIndex).addClass('top')
                    } else if (that.animatedIndex === 2) {
                        $('#' + 'img_1').removeClass('top')
                        $('#' + 'img_' + that.animatedIndex).addClass('bottom')
                    } else if (that.animatedIndex === 3) {
                        $('#' + 'img_2').removeClass('bottom')
                        $('#' + 'img_' + that.animatedIndex).addClass('left')
                    } else if (that.animatedIndex === 4) {
                        $('#' + 'img_3').removeClass('left')
                        $('#' + 'img_' + that.animatedIndex).addClass('right')
                    }
                }, 1000)
            },
            againGame: function () {
                $('#barsBox').html('')
                this.bacNum = totalBac
                this.time = gameTime;
                this.showResultModal = false
                this.isBegain = false
                this.score = 0
                this.list = []
                this.clickOneScore = 4
                this.initGetAll()
                this.initBact()
                this.addAnimate()
                this.gameOver = false
            },
            randomBlock: function () {
                var hasBacBlock = []
                // 随机取块
                for (var i = 0; i < this.bacNum; i++) {
                    var num = parseInt(Math.random() * 12 + 1)
                    var ishas = hasBacBlock.findIndex(function (value, index, arr) {
                        return value === num
                    })
                    if (ishas == -1) {
                        hasBacBlock.push(num)
                    } else {
                        i--
                    }
                }
                return hasBacBlock
            },
            initGetAll: function () {
                var hasBacBlock = this.randomBlock()
                var that = this
                hasBacBlock.forEach(function (item, i) {

                    //获取图片
                    var imgIndex = parseInt(4 * Math.random()) + 1
                    // 偏移位置
                    var left = parseInt(Math.random() * 10)
                    var bottom = parseInt(Math.random() * 15)
                    // 随机生成滑动次数
                    var value = that.sweepList[i]
                    // 随机生成旋转度数
                    var rotateValue = parseInt(Math.random() * 50 + 10)
                    var tip = ''
                    if (i === 0) {
                        tip = ' <img id="tipImg" src="./asset/images/swipe_touch_5.png" class="top" style="width: 0.5rem; height: 0.5rem;bottom: '+bottom+'px; left: '+left+'px;position:absolute;z-index:3" alt="">'
                    }
                    var html = '<div class="bar-box-' + (item) + '">' + tip 
                    +'<img name="bacteria" id="'+i+'" style="transform: rotate('+rotateValue+'deg); -webkit-transform: rotate('+rotateValue+'deg); bottom: '+bottom+'px; left: '+left+'px;" src="./asset/images/bacteria' + imgIndex + '.png" class="bacteria bacteria-img' + imgIndex + '"></div>'
                    $('#barsBox').append(html)
                    $('#app1').fadeIn()
                    that.list.push({
                        num: value,
                        all: value
                    })
                })
            },
            initBact: function () {
                var that = this
                //手指放到屏幕上时触发
                $('img[name="bacteria"]').on('touchstart', function (e) {
                    that.startY = e.originalEvent.changedTouches[0].pageY
                    that.startX = e.originalEvent.changedTouches[0].pageX
                    $('#mineBrush').show()
                    $('#mineBrush').css('left', parseFloat(e.originalEvent.changedTouches[0].pageX) - 10)
                    $('#mineBrush').css('top', parseFloat(e.originalEvent.changedTouches[0].pageY) - 20)
                })

                //手指离开屏幕时触发
                $('img[name="bacteria"]').on('touchend', function (e) {
                    that.endY = e.originalEvent.changedTouches[0].pageY
                    that.endX = e.originalEvent.changedTouches[0].pageX
                    $('#mineBrush').hide()

                    if (that.startX > that.endX + 30) {
                        console.log('向左滑动')
                        that.correntKill(e)
                    } else if (that.startX < that.endX - 30) {
                        console.log('向右滑动')
                        that.correntKill(e)
                    } else if (that.endY < that.startY - 30) {
                        console.log('向上滑动')
                        that.correntKill(e)
                    } else if (that.endY > that.startY + 30) {
                        console.log('向下滑动')
                        that.correntKill(e)
                    }

                })
            },
            // 正确点击
            correntKill: function (e) {
                $('#tipImg').css('display', 'none')
                var that = this
                $('#mineBrush').addClass('brushing-up')
                $('#mineBrush').show()
                $('#mineBrush').css('z-index', '19')
                common.audioAutoPlay('brushingMusic')
                
                var that = this
                setTimeout(function () {
                    that.score += that.clickOneScore
                    var index = e.target.id
                    //总点击数
                    // var totalValue = parseInt(e.target.dataset.all)
                    var totalValue = parseInt(that.list[index].all)
                    // 剩余点击数
                    // var lastClickValue = e.target.dataset.num - 1
                    var lastClickValue = that.list[index].num - 1

                    var opacityValue = parseInt(lastClickValue) / totalValue
                    // e.target.dataset.num = lastClickValue
                    that.list[index].num = lastClickValue
                    e.target.style.opacity = opacityValue
                    if (lastClickValue <= 0) {
                        e.target.style.display = 'none'
                        e.target.parentElement.style.display = 'none'
                    }
                    $('#mineBrush').css('z-index', '9')
                    $('#mineBrush').hide()
                    $('#mineBrush').removeClass('brushing-up')
                }, 800)
            },
            beginGame: function () {
                var that = this
                this.isBegain = true
                this.timer = setInterval(function () {
                    that.time--
                }, 1000)
            }
        }
    })
})
