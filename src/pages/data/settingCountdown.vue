<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Update CountDown</h5>
                    <div class="forms-inputs mb-4"><span>Nama CountDown</span>
                        <input 
                                type="text" 
                                id="inputNama" 
                                placeholder="Masukkan Nama"
                                v-model="txtNama"
                        />                        
                    </div>                    
                    <div class="forms-inputs mb-4"><span>Judul</span>
                        <input 
                                type="text" 
                                id="inputJudul" 
                                placeholder="Masukkan Judul"
                                v-model="txtJudul"
                        />                        
                    </div>
                    <div class="forms-inputs mb-4"><span>Detail</span>
                        <input 
                                type="text" 
                                id="inputDetail" 
                                placeholder="Masukkan Detail"
                                v-model="txtDetail"
                        />                        
                    </div>
                    <div class="forms-inputs mb-4"><span>Tanggal</span>
                        <input 
                                type="date"
                                id="inputTanggal" 
                                v-model="txtbatasTanggal"
                        />                        
                    </div>
                    <div class="forms-inputs mb-4"><span>Tampilkan ?</span>
                        <input 
                                type="checkbox"
                                id="inputTampil"
                                value="tampil"
                                v-model="tampil"
                        />                        
                    </div> 
                    <div class="mb-3"> <button v-on:click="updateData()" class="btn btn-dark w-100">Simpan</button> </div>                                                          
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'settingCountdown',
    data(){
        return{
            txtJudul: '',
            txtDetail: '',
            txtbatasTanggal: '',
            txtNama: '',
            tampil: true
        }
    },
    mounted() { this.ambilData()},
    methods: {
        ...mapActions('countdown', ['updateCountdown', 'getCountdown']),
        formatDate(date){
            const tgl           = new Date(date)
            const monthNames    = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            const day           = tgl.getDate();
            const monthIndex    = tgl.getMonth();
            const year          = tgl.getFullYear();
            return monthNames[monthIndex]+ ' ' + day   + ',' + year;
        },
        formatTgl(date){
            const tgl           = new Date(date)
            const monthNames    = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
            const day           = tgl.getDate();
            const monthIndex    = tgl.getMonth();
            const year          = tgl.getFullYear();
            return  year + '-'  + monthNames[monthIndex]+ '-' + day;            
        },
        ambilData(){
            const penyimpanan   = window.localStorage;
            const entries       = penyimpanan.getItem("dataCountDown");
            if(entries !== null){
                try {
                    const objEntries        = JSON.parse(entries)
                    this.txtJudul           = objEntries.judul;
                    this.txtDetail          = objEntries.detail;
                    this.txtbatasTanggal    = this.formatTgl(objEntries.batasTanggal);
                    this.txtNama            = objEntries.nama;
                    this.tampil             = objEntries.tampil;                    
                } catch (error) {
                    this.getCountdown()
                    .then(response => {
                        this.txtJudul           = response.judul;
                        this.txtDetail          = response.detail;
                        this.txtbatasTanggal    = this.formatTgl(response.batasTanggal);
                        this.txtNama            = response.nama;
                        this.tampil             = response.tampil;
                    })
                    .catch((err) => console.log(err))
                    console.log(`dari bagian try error objEntries ${error}`)                    
                }
                // console.log('via localstorage')
            } else {
                this.getCountdown()
                .then(response => {
                    this.txtJudul           = response.judul;
                    this.txtDetail          = response.detail;
                    this.txtbatasTanggal    = this.formatTgl(response.batasTanggal);
                    this.txtNama            = response.nama;
                    this.tampil             = response.tampil;
                    // console.log('via firebase database')
                })
                .catch((err) => console.log(err))
            }
        },
        updateData(){
            const data = {
                batasTanggal: this.txtbatasTanggal,
                detail: this.txtDetail,
                judul: this.txtJudul,
                nama: this.txtNama,
                tampil: this.tampil,            
            }
            this.updateCountdown(data)
            .then(response => response ? console.log(response) : console.log("belum berhasil") )
            .catch((err) => console.log(err))
        }        
    },

}
</script>