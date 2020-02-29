<template>
    <div>
        <commet :id='id'></commet>
    </div>
</template>

<script>
    import commet from '../newList/commet.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id
            }
        },
        components:{
            commet
        }
    }
</script>

<style lang='scss'>

</style>