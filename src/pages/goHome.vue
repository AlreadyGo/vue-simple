<template>
    <div style=" margin-top: 10%;margin-left: 42%;margin-right: 42%;">
        <h4>{{count}}秒后,跳转主页.....</h4>
    </div>
</template>
<script>
    export default{
        data(){
            return{
               count:3
            }
        },
        methods:{
            go(c){
                    new Promise(f=>setTimeout(f,1000)).then(()=>{
                            c-=1;this.count=c;
                            if(c>0){
                                this.go(c);
                            }else{
                                this.$router.replace("/main/home")
                            }
                    })

            }
        },
        mounted(){
            this.go(this.count);
        }
    }
</script>
