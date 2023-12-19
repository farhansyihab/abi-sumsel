<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Update Profile User</h5>
                        <div class="forms-inputs mb-4"><span>Nama User</span> 
                            <input 
                                type="text" 
                                id="inputNama" 
                                placeholder="Nama Anda disini"
                                v-model="txtNama"
                            />
                        </div>
                        <div class="forms-inputs mb-4"><span>No Telp</span>
                            <input 
                                type="text" 
                                id="inputNoTelp" 
                                placeholder="Masukkan No Telp" 
                                v-model="txtPhone"
                            />
                        </div>

                        <div class="forms-inputs mb-4"><span>Photo URL</span>
                            <input 
                                type="text" 
                                id="inputURL" 
                                placeholder="Masukkan URL foto Anda" 
                                v-model="txtURL"
                            />
                        </div>

                        <div class="mb-3"> <button v-on:click="updateData()" class="btn btn-dark w-100">Kirim</button> </div>
                    </div>
                    <div class="card-body">
                        <div id="logout"><button class="btn btn-danger">Logout</button></div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dataUsers } from '../../store/datausers/index.js'
export default {
    name: 'updateUser',
    data(){
        return {
            txtNama: "",
            txtURL: "",
            txtPhone: ""
        }
    },
    computed: {},
    mounted(){ this.getDataUser() },
    methods: {
        getDataUser(){
            dataUsers().getUserName ? this.txtNama = this.getUserName : this.txtNama = "" ;
            dataUsers().getUserPhoto ? this.txtURL = this.getUserPhoto : this.txtURL = "" ;
            dataUsers().getUserTelp ? this.txtPhone = this.getUserTelp : this.txtPhone = "" ;
        },
        updateData(){
            const data = {
                namaUser : this.txtNama,
                urlPhoto: this.txtURL,
                noTelp: this.txtPhone
            }
            dataUsers().updateDataUser(data)
            .then(response => response ? console.log(response) : console.log("belum berhasil") )
            .catch((err) => console.log(err))
        }
    }
}
</script>