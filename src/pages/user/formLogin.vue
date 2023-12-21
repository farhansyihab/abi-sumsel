<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card px-5 py-5" id="form1">
                    <div class="form-data" v-if="!submitted">
                        <form class="login" @submit.prevent="login">
                            <div class="forms-inputs mb-4"> <span>Email or username</span> 
                                <input 
                                    autocomplete="off" 
                                    type="text" 
                                    v-model="login_form.email"
                                    class="frmInput"
                                />
                            <div class="invalid-feedback">Masukkan alamat email yang benar!</div>
                            </div>
                            <div class="forms-inputs mb-4"> <span>Password</span> 
                                <input
                                    autocomplete="off" 
                                    type="password" 
                                    v-model="login_form.password" 
                                    class="frmInput"
                                />
                                <div class="invalid-feedback">Minimal password 6 karakter!</div>
                            </div>
                            <!-- <div class="mb-3"> <button v-on:click.stop.prevent="submit" class="btn btn-dark w-100">Login</button> </div> -->
                            <div class="mb-3"> <input type="submit" value="Login" class="btn btn-dark w-100"/> </div>
                        </form>
                    </div>
                    <div class="success-data" v-else>
                        <div class="text-center d-flex flex-column"> <i class='bx bxs-badge-check'></i> <span class="text-center fs-1">You have been logged in <br> Successfully</span> </div>
                    </div>
                    <!-- Login via google-->
                    <div class="row">
                        <div class="col-md-6">
                            <button class="btn btn-outline-primary w-100" @click="loginGoogle">
                                <span class="bi-google" aria-hidden="true"></span>&nbsp;&nbsp;Login With Google
                            </button>
                        </div>
                    </div>
                    <!-- end of login via google-->
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import { ref,reactive } from 'vue'
import { dataUsers } from '../../store/datausers/index.js'
import router from '../../router/index.js';

export default {
    name: "formLogin",
    setup() {
        const login_form    = ref({})
        const login         = () => { dataUsers().login(login_form.value)}
        const loginGoogle   = function() { dataUsers().loginWithGoogle() }
        const state = reactive({
            submitted: false,
        })
        return {
            login_form, login, state, loginGoogle
        }
    },
    methods: {
        aturLogin(){
            dataUsers().cekLogin().then(response => {
                if(response){
                    router.push('/')
                }
             })
        }
    },
    mounted() { this.aturLogin()}
}
</script>

<style scoped>
.card{border: none;height: 320px}
.forms-inputs{position: relative}
.forms-inputs span{position: absolute;top:-18px;left: 10px;background-color: #fff;padding: 5px 10px;font-size: 15px}
.forms-inputs input{height: 50px;border: 2px solid #eee; width: 100%;}
.forms-inputs input:focus{box-shadow: none;outline: none;border: 2px solid #000}
.btn{height: 50px}
.success-data{display: flex;flex-direction: column}
.bxs-badge-check{font-size: 90px}
</style>