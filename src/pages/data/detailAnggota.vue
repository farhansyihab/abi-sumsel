<template>
    <div class="container">
        <div class="root">
            <div class="col-12">
                <div class="info-container d-flex flex-column align-items-center justify-content-center">
                    <div class="info-item d-flex">
                        <i class="bi bi-person-circle flex-shrink-0"></i>
                        <div>
                        <h4>Nama:</h4>
                        <p>{{ state.dataAnggota.nama }} &nbsp;&nbsp;&nbsp; {{ state.dataAnggota.jk }}</p>
                        <p>No SIANGGA :&nbsp;{{ state.dataAnggota.noSIANGGA }}</p>
                        <p>{{ state.dataAnggota.statusPelatihanABI }}</p>
                        </div>
                    </div>

                    <div class="info-item d-flex">
                        <i class="bi bi-calendar3 flex-shrink-0"></i>
                        <div>
                        <h4>Tempat & Tanggal Lahir:</h4>
                        <p>{{ state.dataAnggota.tempatLahir }}, &nbsp; {{ state.dataAnggota.tglLahir }} </p>
                        <p>Umur : {{ state.generateUmur }}</p>
                        </div>
                    </div>

                    <div class="info-item d-flex">
                        <i class="bi bi-geo-alt flex-shrink-0"></i>
                        <div>
                        <h4>Alamat:</h4>
                        <p>{{ state.dataAnggota.alamat }}</p>
                        <p><i class="bi bi-telephone flex-shrink-0" style="font-size: 18px; padding:1px; margin: 1px;"></i>{{ state.dataAnggota.noTelp }}</p>
                        <p><i class="bi bi-envelope-at flex-shrink-0" style="font-size: 18px; padding:1px; margin: 1px;"></i>{{ state.dataAnggota.email }}</p>
                        </div>
                    </div> 

                    <div class="info-item d-flex">
                        <i class="bi bi-person-walking flex-shrink-0"></i>
                        <div>
                        <h4>Skill dan Pekerjaan:</h4>
                        <p>Skill :&nbsp;{{ state.dataAnggota.keahlian }}</p>
                        <p>Pekerjaan :&nbsp;{{ state.dataAnggota.pekerjaan }}</p>
                        <p>Pendidikan :&nbsp;{{ state.dataAnggota.pendidikan }}</p>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, reactive } from "vue";
import { localData } from '../../firebase/getLocalDataClass.js'
export default {
    name:'DetailAnggota',
    setup(){
        const state = reactive({
            dataAnggota: '',
            htmlCard: '',
            generateUmur: computed(() => {
                const tanggal = new Date();
                const strTglLahir = state.dataAnggota.tglLahir
                const dateParts = strTglLahir.split("/");
                const tglLahir  = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
                const thnSekarang = tanggal.getFullYear(); //getting current year
                const thnLahir = tglLahir.getFullYear(); //getting tahun kelahiran
                const umur = thnSekarang - thnLahir;
                return umur
            })
        })
        return { state }
    },
    beforeMount() { this.ambilData()},
    methods: {
        ambilData(){
            const idData            = this.$route.params.id ;
            const objData           = new localData('dataAnggota');
            const allData           = objData.getObjJSONData();
            const personData        = allData[idData] ;
            this.state.dataAnggota  = personData;
        },
    }
}
</script>
<style scoped>
.container{
    padding-top:25px;
    padding-bottom:25px;
}
.info-container{
  background-color: var(--color-primary);
  height: 100%;
  padding: 20px;
  border-radius: 10px 0 0 10px;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
}
.info-item {
  width: 100%;
  background-color: #009282;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  
}
.bi{
    font-size: 30px;
    margin-right: 15px;
    padding-right: 15px;
}
</style>