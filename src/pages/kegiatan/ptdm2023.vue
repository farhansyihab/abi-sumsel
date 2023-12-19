<template>
    <div class="container">
        <div class="row">
            <div class="col-12" style="padding: 10px 0 10px 0;">
                <span>Tampilan versi asli dari pusat (tampilan tidak responsive) silahkan klik disini </span>
                <router-link :to="{ name: 'ptd2023'}" class="btn btn-primary">Buka</router-link>
            </div>
        </div>
        <div class="row">
            <div id="kop" class="col-12"><img :src="require('../../assets/img/ataskopsurat.png')" style="width: 100%;"/></div>
        </div>
        <h3 style="text-align: center;">Jadwal Pendidikan Tingkat Dasar</h3>
        <div class="row">
            <div class="col-3 headertbl border">JAM</div> <div class="col-5 headertbl border">KEGIATAN</div> <div class="col-4 headertbl border">PELAKSANA</div>
        </div>

        <div id="haripertama" v-html="hariPertama"></div> 
        <div id="haripertama" v-html="hariKedua"></div> 

        <div class="row"><span></span><br></div>
        <div class="row kopbawah">
            <div class="col-12">
                <p>Perkantoran Buncit Mas Blok AA 7, Jl. Kemang Utara IX No. 35 Duren Tiga, Jakarta Selatan</p>
            </div>
        </div>
        <div class="row kopbawah">
            <div class="col-12">
                <p>Telp: +6221-7946407 Fax: +6221-7975780 Email: info@ahlulbait.id</p>
            </div>
        </div>
        <div class="row kopbawah">
            <div class="col-12">
                <p>Website: <a href="www.ahlulbaitindonesia.or.id" target="_blank">www.ahlulbaitindonesia.or.id</a></p>
            </div>
        </div>

        <div class="row merahbawah">
            <div class="col-12"><span><br></span></div>
        </div>
    </div>
</template>
<script>
import { getDatabase, ref, onValue } from 'firebase/database'
const db = getDatabase()
export default { 
    name: 'ptdm2023',
    data() {
        return{
            hariPertama: '',
            hariKedua: ''
        }
    },
    mounted() { 
        this.dataHariPertama()
        this.dataHariKedua()
    },
    methods:{
        dataHariPertama() {
            const refHariPertama = ref(db, '/jadwalPTD/hari/0')
            onValue(refHariPertama, (snapshot) =>{
                this.hariPertama = snapshot.val()
            })
        },
        dataHariKedua() {
            const refHariPertama = ref(db, '/jadwalPTD/hari/1')
            onValue(refHariPertama, (snapshot) =>{
                this.hariKedua = snapshot.val()
            })
        },        
    },
    }
</script>

<style scoped>
    .headertbl{
        background-color: #528135;
        text-align: center;
        border-width: 2px;
        border-color: black;
    }

    .kopbawah{
        text-align: center;
        font-size: 10px;
    }

    .merahbawah{
        background-color: #cc232a;
    }
</style>