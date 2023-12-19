<template>
    <main id="main">
        <div class="container">
            <div :class="{ hide: ptd }">
                <div class="row" style="margin:20px !important;">
                    <div class="col-12">
                        <p>ABI akan menyelenggarakan Pendidikan Tingkat Dasar pada tanggal 17 Juni 2023 hingga 18 Juni 2023</p>
                        <router-link :to="{ name: 'ptdm2023'}">Silahkan lihat jadwal kegiatan PTD, klik disini</router-link>
                    </div>                
                </div>
            </div>            
        </div>
        <iframe 
        id="frameForm"
        v-bind:src="generateURL" 
        frameborder="0"
        marginwidth="0"
        width="100%"
        height="1000px"
        >Memuat ...
    </iframe>
    </main>
</template>

<script>
export default {
    name: 'FormDaftar',
    data() {
        return{
            ptd:false,
        }
    },
    computed: {
        generateURL () {
            const parameter     = this.$route.params.namaForm ;
            switch (parameter) {
                case 'siangga':
                    return 'https://docs.google.com/forms/d/e/1FAIpQLScCCAuAxXt7qNFpILq4LeWuAuTMbETSe4FdRqvCLpuX31-ZxQ/viewform' ;
                    this.ptd = false;
                    break;
                
                case 'ptd' :
                    return 'https://docs.google.com/forms/d/e/1FAIpQLSff-O3T6d_Tvwrfa7_Ryj33ztCq51yCmeNNNLuwCwykeZ7m6A/viewform?embedded=true'
                    this.ptd = true;
                    break;

                default:
                    return 'https://docs.google.com/forms/d/e/1FAIpQLSff-O3T6d_Tvwrfa7_Ryj33ztCq51yCmeNNNLuwCwykeZ7m6A/viewform?embedded=true' ;
                    this.ptd = false;
                    break;
            }
        }
    },
}
</script>

<style scoped>
.hide { visibility: hidden !important; }
</style>