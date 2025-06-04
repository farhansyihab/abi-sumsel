<template>
    <main id="main">
       <div class="container" v-html="generateHTML"></div>
       <!-- <div><a href="/post/abi/01.html">Link percobaan</a></div> -->
    </main>
</template>
<script>
// import { mapState, mapActions } from 'vuex'
import { blogInfo } from '../store/blog/index.js'
export default {
    name: "Postinfo",
    computed: {
        generateHTML(){
            const objData       = blogInfo().posts ;
            let htmlData        = '';
            let htmlid          = '';
            const arrID         = ['1106927242102888016', '1172762867272173731', '2126155153926242495', '2731763834557398828', '3075900381393335720', '3662480960212832759', '1239232124096794452', '7399827294498166630', '8079712888587087195', '7017324018233291914', '6044417308551069506', '5858928875274719306', '4053517885570116689', '1106927242102888016'];
            for(let index = 0; index < objData.length; index++){
                let id          = objData[index].id; 
                let addlocal    = `<div class="card-footer"><a href='/post/abi/${id}.html' class="btn btn-primary">Baca selengkapnya</a></div>`
                let addrblog    = `<div class="card-footer"><a href='/detailinfo/${id}' class="btn btn-primary">Baca selengkapnya</a></div>`
                arrID.includes(id) ? htmlid = addlocal : htmlid = addrblog ;              
                let judul       = `<div class="card-header"><h2 class="card-title">${objData[index].title} </h2></div>`;
                let potong      = objData[index].content.split("<a name='more'></a>")
                let isi         = `<div class="card-body">${potong[0]}</div>`
                if(id === null){
                    htmlData = htmlData + ''
                } else {
                    htmlData    = htmlData + `<div class="card">${judul} ${isi}${htmlid}</div>` ;
                }
            }
            const lebarLayar    = window.screen.availWidth;
            if(lebarLayar < 500){
                return `<div class='isiInfo'>${htmlData}</div>`;
            }else{
                return `<div class='isiInfo' style='padding-top: 10px; display: grid; grid-template-columns: auto auto ; gap: 10px; grid-auto-rows: minmax(100px, auto);'>${htmlData}</div>`;
            }            
        },
    },
    mounted() {
        blogInfo().fetchPosts()
    }    
}
</script>

<style scoped>
.isiInfo {
    
    display: grid;
    grid-template-columns: auto auto ;
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}
</style>