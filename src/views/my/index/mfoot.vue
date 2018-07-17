<template>
     <footer :class="{up:isDetail}">
	    <audio  id="audio" controls="controls" src="http://qiniuuwmp3.changba.com/795022664.mp3" class="display-none"> </audio>
        <transition name="bounce">
        <div v-show="isDetail" class="detail-info">
            <div class="detail-img">
                <i class="iconfont icon-back" @click="showDetail"></i>
                <img src="../../../assets/logo.jpg" width="100%">
                <p>{{music.name}}</p>
            </div>
            <div class="timeBar">
                <div class="currentBar" :style="Left"></div>
                <div id="drag" :style="dragStyle"></div>
            </div>
            <div class="time">
                <span>{{currentTime}}</span>
                <span>{{totleTime}}</span>
            </div>
             <div class="detail-btn">
                <span class="btn" @click.stop="prev"><i style="font-size:2em" class="iconfont icon-prev"></i></span>
                <span class="btn" @click.stop="play" v-show="cut"><i class="iconfont icon-kaishi"></i></span>
                <span class="btn" @click.stop="stop" v-show="!cut"><i class="iconfont icon-zanting"></i></span>
                <span class="btn" @click.stop="next"><i style="font-size:2em" class="iconfont icon-next"></i></span>
            </div>
        </div>
        </transition>
        <div class="playBar" v-show="!isDetail">
            <div class="text-area"  @click="showDetail">
                <div><img src="../../../assets/logo.jpg" width="100%"></div>
                <div class="info">
                    <div class="singInfo">
                        <span class="mName">{{music.name}}</span>
                        <span class="singer">{{music.singer}}</span>
                    </div>
                    <div class="singInfo">
                        <span class="btn" v-if="isLoad">load...</span>
                        <span v-else="isLoad">
                            <span class="btn" @click.stop="play" v-show="cut"><i class="iconfont icon-kaishi"></i></span>
                            <span class="btn" @click.stop="stop" v-show="!cut"><i class="iconfont icon-zanting"></i></span>
                            <span class="btn" @click.stop="next"><i class="iconfont icon-next"></i></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="timeBar">
                <div class="currentBar" :style="Left"></div>
            </div>
        </div>    
    </footer>
   
</template>


<script>

let startX, x, aboveX = 0;

export default {
	data () {
     return {
            audio:{},
            totleTime:0,
            isLoad:false,
            Left:{
                left:'-100%',
            },
            speed:1000,
            sTime:0,
            currentTime:'0:00',
            tCut:true,
            currentTimeNum:0,
            detail:false
        }
    },
    computed:{
        loading(){
            return this.isLoad
        },
        cut(){
            return this.tCut 
        },
        isDetail(){
            return this.detail
        },
        dragStyle(){
            var num = 100+parseFloat(this.Left.left)
            return {left:num+'%'}
        }
    },
    created(){
        var _this = this
        document.body.addEventListener('touchstart',_this.start,false)
    },
    props:[
        'music'
    ],
    watch:{
        music:function(val, oldVal){
            this.audio.src = this.music.url
            this.stop()
            this.reset()
            setTimeout(()=>{
                this.play()
            },400)
        }
    },
    methods:{
        start(){
            this.audio = document.getElementById('audio');
            this.audio.src = this.music.url
            this.audio.loop = true
            this.playCotrol()
            this.addListenTouch()
            this.remove()
        },
        play(){
            this.audio.play()
            this.timeRun()
        },
        stop(){
            this.audio.pause()
        },
        next(){
            this.$emit('nextid',this.music.id)
        },
        prev(){
            this.$emit('previd',this.music.id)
        },
        remove(){
            document.body.removeEventListener('touchstart',this.start,false)
        },
        nextTime(){
            this.audio.currentTime = '10'
        },
        playCotrol(){
            var _this= this
            this.audio.addEventListener("loadstart", 
                    function() {
                        _this.isLoad = true
                    }, false);
            this.audio.addEventListener("loadedmetadata",
                    function() {
                        _this.isLoad = false
                        _this.sTime = _this.audio.duration
                        _this.totleTime = _this.changeTime(_this.audio.duration)
                        _this.process = 100 / _this.audio.duration
                    }, false);
            this.audio.addEventListener("pause",function(){
                _this.timeOut()
            }, false);
            this.audio.addEventListener("play",
                    function() { //监听播放
                      console.log(_this.audio.currentTime)
                        //dragMove();
                    }, false);
            this.audio.addEventListener("ended", function() {
                        _this.reset()
                    }, false)
                
        },
        addListenTouch() {
            var drag = document.getElementById("drag");
            drag.addEventListener("touchstart", this.touchStart, false);
            drag.addEventListener("touchmove", this.touchMove, false);
            drag.addEventListener("touchend", this.touchEnd, false);
        },
        touchStart(e) {  
            this.stop()
            e.preventDefault();
            var touch = e.touches[0];
            startX = touch.pageX; 
        },
        touchMove(e) { //滑动          
            e.preventDefault();
            var touch = e.touches[0];
            x = touch.pageX - startX; //滑动的距离
            if(window.innerWidth > touch.pageX && touch.pageX >= 0){
                this.Left.left = `${aboveX+(x/window.innerWidth)*100-100}%`
            }
        },
        touchEnd(e) { //手指离开屏幕
            this.play();
            e.preventDefault();
            aboveX = parseFloat(this.Left.left)+100;
            var touch = e.touches[0];
            var currentTime = aboveX/100 * this.audio.duration;
            this.audio.currentTime = currentTime;
        },
        changeTime(t){
            var time = parseInt(t)
            var scound = time%60 > 9 ? time%60 : '0'+time%60
            return Math.floor(time/60)+':'+scound
        },
        timeRun(){
            this.tCut = false
            var _this = this
            this.calc = setInterval(() =>{
                _this.Left.left = (_this.audio.currentTime/_this.sTime)*100 - 100 + '%';
                aboveX =parseFloat(_this.Left.left)+100; // 随着播放时间调整；
                _this.currentTime = _this.changeTime(_this.audio.currentTime)
            },1000/this.speed) 
            
        },
        timeOut(){
            clearInterval(this.calc)
            this.tCut = true
        },
        reset(){
            this.timeOut()   
            this.tCut = true
        },
        showDetail(){
            this.detail = !this.detail
        }
    }
}
</script>
<style lang='scss'>
    .timeBar{
        width:100%;
        height:2px;
        background:#CCC;
        position:relative;
        & > #drag{
            width:20px;
            height:20px;
            background:#000;
            position:absolute;
            border-radius:50%;
            top:-9px;
            background:#fff;
        }
    }
    .currentBar{
        width:100%;
        height:2px;
        background:#FF5000;
        position: absolute;
    }
    .display-none{
        display:none
    }
    .playBar{
        .time{
            padding:0px 4px;
            color:#CCC;
        }
        .text-area{
            display:flex;
            display:-webkit-flex;
            width:100%;
            height:44px;
            & > div{
                display:inline-block;
                height:100%
            }
            & > div:first-child{
                width:44px;
                
            }
            & > div:last-child{
                width:calc(100% - 44px);
                background:#6baf0c;
                .singInfo{
                    display:flex;
                    display:-webkit-flex;
                    flex-direction:column;
                    -webkit-flex-direction:column;
                    justify-content:center;
                    -webkit-justify-content:center;
                    padding-left:10px;
                    width:45%;
                    height:100%;
                    font-size:14px;
                    float:left;
                    .mName{
                        color:#FFF;
                    }
                    .singer{
                        font-size:12px;
                        color:#CCC;
                    }
                    .btn{
                        color:#FFF;
                        width:50px;
                    }
                }
                .singInfo:last-child{
                    align-items:flex-end;
                }
            }
        } 
        .iconfont{
            font-size: 23px;
            margin:0 10px;
        }
    }
    .playBar .time span:last-child{
        float:right
    }
    .playBar .time{
        font-size:12px;
        color:#CCC;
    }

    .music-detail{
        position:absolute;
        z-index:777;
        width:100%;
        height:100%;
        display:flex;
        display:-webkit-flex;
        top:0;
        left:0;
        background:#ccc;

    }
    .fade-enter-active{
      transition: opacity .5s
    }
    .fade-enter{
      opacity: 0
    }
    .up{
        position: absolute;
        background: #587247;;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
    }

    .detail-info {
        display:flex;
        display:-webkit-flex;
        flex-direction:column;
        -webkit-flex-direction:column;
        width:100%;
        height:100%;
        .time{
            font-size:12px;
            color:#FFF;
            padding:8px 4px;
            & > span:last-child{
                float:right
            }
        }
        .detail-btn{
            display: flex;
            display:-webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            margin:2em 0;
            span > i{
                font-size:4em;
                color: #FFF;
                margin:0 0.8em;
            }
        }
        .icon-back{
            font-size: 2em;
            color: #FFF;
            position: absolute;
            top: 10px;
            left:10px
        }
        .detail-img{
            flex-grow: 1;
            -webkit-flex-grow: 1;
            color:#FFF;
            text-align:center;
        }
    }
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-out .5s;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
        opacity:0
      }
      50% {
        transform: scale(1.5);
        opacity:0.5
      }
      100% {
        transform: scale(1);
        opacity:1
      }
    }
    @keyframes bounce-out {
      0% {
        transform: scale(1);
        opacity:0.8
      }
      50% {
        transform: scale(1.5);
        opacity:0.5
      }
      100% {
        transform: scale(0);
        opacity:0
      }
    }

</style>