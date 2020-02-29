<template>
    <div class="mui-numbox" data-numbox-min="1" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">
        -
      </button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change='count' ref='inp'/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">
        +
      </button>
    </div>
</template>

<script>
import { Button } from 'mint-ui'
import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return{

            }
        },
        methods:{
            count(){
                this.$emit("passCount",this.$refs.inp.value)
            }
        },
        props:["max"],
        watch:{
            max: function(newval,oldval){
                mui(".mui-numbox").numbox().setOption("max", newval)
            }
        }
    }
</script>

<style>

</style>