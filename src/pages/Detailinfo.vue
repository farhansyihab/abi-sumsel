<template>
    <main id="main">
        <div class="container">
            <div class="social-links  d-flex flex-row-reverse align-items-center" v-html="sosmedShare">
            </div>            
        </div>
        <div class="container" v-html="htmlBlog"  style="padding: 20px 15px 20px 15px;"></div>
    </main>
</template>

<script>
import { warn } from 'vue';
import { blogInfo } from '../store/blog/index.js'
import { blogDataService } from '../firebase/BlogService.js'
import { MainTag, sosmedTag } from '../components/classMainTag.js'
export default {
    name: "Detailinfo",
    data(){
        return { htmlBlog: '', metaTag: ''}
    },
    computed: {
        sosmedShare() {
            const parameter = this.$route.params.id ;
            const baseURL   = window.location.origin ;
            const fullURL   = `${baseURL}/detailinfo/${parameter}`
            const whatsapp  = `<div><a href="https://api.whatsapp.com/send?text=${fullURL}" data-action="share/whatsapp/share" class="whatsapp"><i class="bi bi-whatsapp"></i></a></div>`
            const facebook  = '<div class="fb-share-button" data-href="${fullURL}" data-layout="" data-size=""><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fopmd-sumsel.web.app%2Fdetailinfo%2Ftag%3Ablogger.com%2C1999%3Ablog-5255358249157674175.post-1911537108658712600&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><i class="bi bi-facebook"></i></a></div>' 
            const twitter   = `<div><a href="#" class="twitter"><i class="bi bi-twitter"></i></a></div>`
            const instagram = `<div><a href="#" class="instagram"><i class="bi bi-instagram"></i></a></div>`
            return `${twitter} &nbsp;&nbsp; ${facebook} &nbsp;&nbsp; ${instagram} &nbsp;&nbsp; ${whatsapp}` ;
        }
    },
    beforeMount() {
        blogInfo().fetchPosts()
    },
    mounted(){
        this.generateHTML()
    },
    methods: {
        ambilDataBlogById(){
            const parameter = this.$route.params.id ;
            const objBlog   = new blogDataService();
            objBlog.getDataById(parameter).then((response) =>{ 
                this.htmlBlog = `<h2>${response.title} </h2><div>${response.content}</div>`
                this.metaTag = response.meta
            })
        },
        generateHTML(){
            const parameter = this.$route.params.id ;
            const objData   = blogInfo().getPostById(parameter) ;
            if(objData != null){
                const judul     = `<h2>${objData.title} </h2>`;
                const isiKonten = `<div>${objData.content}</div>` ;
                const htmlData  = `<div>${judul} ${isiKonten}</div>` ;
                this.htmlBlog   = htmlData;
                this.metaTag    = objData.meta
            }else{
                this.ambilDataBlogById()
            }
        },
    }
}
</script>