import $ from 'jquery'
import Vue from 'Vue'
var common = require('./common.js')

// var unrestScroll = require('./unrestScroll.js')

$(function () {
    new Vue({
        el: '#app1',
        data: {
            count: 0,
            newstr: '',
            other: '|',
            active: 1,
            max: 3
        },
        created: function () {
            this.activeOne()
        },
        methods: {
            beigin: function () {
                var that = this
                var html = '<audio src="./asset/images/audio.mp3" id="audio"></audio>'
                $('#app1').append(html)
            },
            activeOne: function () {
                this.beigin()
                common.audioAutoPlay('audio')
                var story = '小朋友们，以前有只鳄鱼先生，它已经成年了但是却和小朋友一样，很喜欢吃甜食，它最喜欢吃的就是蛋糕，每天都会吃很多蛋糕;'
                this.writeWords(story)
            },
            activeTwo: function () {
                var that = this
                setTimeout(function () {
                    $('.show-box-2').fadeIn()
                    $('#words').html('')
                    that.count = 0
                    that.newstr = ''
                    that.other = '|'
                    var story = '但是鳄鱼先生有个坏毛病就是懒，有天晚上睡觉前，它为了不刷牙索性把牙刷丢了，丝毫不理牙齿上的蛋糕碎屑;'
                    that.writeWords(story)
                }, 1000);
            },
            activeThree: function () {
                var that = this
                setTimeout(function () {
                    $('.show-box-3').fadeIn()
                    $('#words').html('')
                    that.count = 0
                    that.newstr = ''
                    that.other = '|'
                    var story = '第二天起来，鳄鱼先生觉得牙齿有点疼，照镜子发现牙齿又脏又臭，还有些小虫子在破坏它的牙齿。快点帮帮鳄鱼先生！'
                    that.writeWords(story)
                }, 1000);
            },
            writeWords: function (story) {
                var that = this
                var timer = setInterval(function () {
                    var str = story
                    that.newstr += str[that.count];
                    $('#words').html(that.newstr + that.other)
                    that.count++
                    if (that.count == str.length) {
                        clearInterval(timer)
                        that.active = that.active + 1
                        if (that.active <= that.max) {
                            if (that.active === 2) {
                                that.activeTwo()
                            } else if (that.active === 3) {
                                that.activeThree()
                            }
                        } else {
                            $('#wantBrush').fadeIn()
                        }
                    }
                }, 220)
            }
        }
    })
})

