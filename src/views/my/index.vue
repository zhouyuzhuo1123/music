<template>
    <main class="myMusic">
        <m-head></m-head>
    	<m-list :lists="mList" @outM="getM"></m-list>
        <m-foot :music="music" @nextid="next" @previd="prev"></m-foot>
    </main>
</template>

<script>

import {mHead , mList ,mFoot} from './index/'
import { initMusic } from './config'
import { musicList } from './config'
export default {
	data () {
	 return {
	 		music:initMusic,
            mList:musicList
		}
	},
    components:{
        mHead,
        mList,
        mFoot
    },
    methods:{
        getM(m){
            this.music = this.mList[m]
        },
        next(id){
            if(this.mList.length-1 <= id) id = -1
            this.music = this.mList[++id]
        },
        prev(id){
            if(id == 0) id = this.mList.length
            this.music = this.mList[--id]
        }
    }
}
</script>

<style lang="scss">
    body{
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    a{
        text-decoration:none;
        color:#000;
    }
    .myMusic{
        width:100%;
        display:flex;
        display:-webkit-flex;
        height:100%;
        flex-direction:column;
        -weikit-flex-direction:column;
        overflow:hidden;
    }
    .myMusic .body{
        flex-grow:1;
    }
	
</style>