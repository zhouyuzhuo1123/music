<template>
    <div class="music-list">
    	<div class="list" v-for="(list, index) of lists" @click="getM(index)" :id="list.url">
            <div class="img"><img src="../../../assets/logo.jpg" width="100%"></div>
            <div class="detail">
                <span >{{list.name}}</span>
                <span >{{list.singer}}</span>
            </div>
            <div class="more" @click.stop="detail">
                <span>...</span>
            </div>
    	</div>
    </div>
</template>

<script>
export default {
	data () {
	    return {
	 		
		}
	},
    props:[
        'lists'
    ],
    methods:{
        getM(e){
            this.$emit('outM',e)
        },
        detail(){
            alert('哈哈！这里现在什么都还没有')
        }
    }
}

</script>
<style lang="scss">
    .music-list{
        flex-grow: 1;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
        -webkit-flex-grow: 1;
        & > .list{
            display:flex;
            display:-webkit-flex;
            padding:0.5em;
            border-top:1px solid #f4edea;
            .img{
                width: 44px;
                height: 44px;
            }
            .detail{
                padding-left:4px;
                display:flex;
                display:-webkit-flex;
                flex-direction:column;
                -webkit-flex-direction:column;
                flex-grow:1;
                -webkit-flex-grow:1;
                align-items:flex-start;
                & > span:last-child{
                    color:#ccc;
                    font-size:13px;
                }
            }
        }
        & > .list:last-child{
            border-bottom:1px solid #f4edea;
        }
        .more{
            padding:5px;
        }
    }
    .music-list a{
        font-size:1em;
    }
</style>