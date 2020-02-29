<template>
    <div>
        <h3 class='title'>{{info.title}}</h3>
        <hr>
        <div v-html='info.content' class='content'></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                info:[],
                id:this.$route.params.id
            }
        },
        methods:{
            getGoodsList(){
                this.$http.get("http://www.liulongbin.top:3005/api/goods/getdesc/" + this.id).then(res => {
                    if(res.body.status == 0){
                        this.info = res.body.message[0];
                        console.log(this.info)
                    }
                })
            }
        },
        created(){
            this.getGoodsList();
        }
    }
</script>

<style lang='scss'>
.title{
    font-size:14px;
    text-align:center;
    color:skyblue;
    padding:10px 0;
}
.content{
    padding:0 7px;
    img{
        width: 100%;
    }
}
</style>