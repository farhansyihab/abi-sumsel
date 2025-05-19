<template>
  <!-- ======= Header ======= -->
  <section id="topbar" class="topbar d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:mynameisdarma@gmail.com">Darma</a></i>
        <i class="bi bi-phone d-flex align-items-center ms-4"><span>+62 852 6893 9238</span></i>
      </div>
      <div class="social-links d-none d-md-flex align-items-center">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="whatsapp"><i class="bi bi-whatsapp"></i></a>
      </div>
    </div>
  </section><!-- End Top Bar -->

  <header id="header" class="header">
      <nav id="navbar" class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/" style="font-size: 20px;"><router-link to="/">ABI SUMSEL</router-link></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarOPMD" aria-controls="navbarOPMD" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarOPMD">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li @click="tutupNavBar()" class="nav-item"><router-link to="/">Beranda</router-link></li>
                <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'about'}">About</router-link> </li>
                <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'team'}">Struktur Organisasi</router-link> </li>
                <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'info'}">Info</router-link> </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pendaftaran</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                      <li @click="tutupNavBar()"><a href="https://docs.google.com/forms/d/e/1FAIpQLScCCAuAxXt7qNFpILq4LeWuAuTMbETSe4FdRqvCLpuX31-ZxQ/viewform">SIANGGA</a></li>
                      <li @click="tutupNavBar()"><router-link :to="{ name: 'pendaftaran', params: { namaForm: 'ptd' }}">PTD</router-link></li>
                      <li @click="tutupNavBar()"><router-link :to="{ name: 'ptm'}">PTM</router-link></li>		  
                    </ul>
                </li>        
                <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'kontak'}">Kontak Kami</router-link> </li>
                <li @click="tutupNavBar()" class="nav-item" v-if="!statusLogin"><router-link @click="tutupNavBar()" :to="{ path: '/login'}" class="nav-item nav-link" class-active="active" v-if="!state.cekUlangLogin">Login</router-link> </li>
                <li class="nav-item dropdown" v-if="state.cekUlangLogin">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Menu User</a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'updateuser'}">Update User</router-link> </li>
                    <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'settingcountdown'}">Setting Count Down</router-link> </li>
                    <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'datacontact'}">Respon Pengunjung</router-link> </li>
                    <li @click="tutupNavBar()" class="nav-item"><router-link :to="{ name: 'dataanggota'}">Data Kader ABI</router-link> </li>
                    <li @click="LogOut()" class="nav-item" ><a href="/">LogOut</a></li>
                  </ul>
                </li>
                <li @click="updateAplikasi()" class="nav-item"><a href="#">Update Aplikasi</a></li>
              </ul>
              
            </div>
          </div>
      </nav><!-- .navbar -->
  </header><!-- End Header -->
  <!-- End Header -->    
</template>

<script>
import {reactive, computed} from "vue";
import { getAuth, signOut  } from "firebase/auth"
import router from '../router/index.js';
import { dataUsers } from '../store/datausers/index.js'
const auth = getAuth()
export default {
  name: 'Atas',
  setup() {
        const alamat        = window.location.href
        const alamatURL     = new URL(alamat)
        const origin        = alamatURL.origin  
        const state = reactive({
            urlDepan: origin,
            statusNavBar : false, 
            statusLogin: false,
            cekUlangLogin : computed(() => dataUsers().getStatusLogin),
        })
        const tutupNavBar = function() {
            this.state.statusNavBar = false
            const navBar = document.getElementById('navbarOPMD');
            navBar.classList.toggle('hide');
            navBar.classList.remove('show');
        } 
        const bukaNavBar = function() {
            this.state.statusNavBar = true
            const navBar = document.getElementById('navbarOPMD');
            navBar.classList.toggle('show');
            navBar.classList.remove('hide');        
        }
        const LogOut = function(){
            dataUsers().logout()
            this.tutupNavBar();
        }
        return {state, tutupNavBar, bukaNavBar, LogOut}
    },
  beforeMount(){ this.cekLogin() },
  methods: {
    cekLogin(){
      dataUsers().cekLogin().then(response => {
        dataUsers().SET_USER(response)
                this.state.statusLogin = true 
                const userdt    =  {
                    displayName: response.displayName,
                    urlPhoto: response.photoURL,
                    noTelp: response.phoneNumber,
                }
                dataUsers().SET_INFO(userdt)  
      })
    },
    updateAplikasi(){
      if ('serviceWorker' in navigator) {
        caches.keys().then(function(cacheNames) {
          cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
          });
        });
      }
      setTimeout(() => {  window.location.reload(); }, 3000);
    }
  }
}
</script>

<style scoped>
  #header{
    background-color: #008374;
    z-index: 25;
  }

  #navbar {
    background-color: #008374;
    color: black;
    z-index: 9999;
  }

/*--------------------------------------------------------------
# Mobile Navigation
--------------------------------------------------------------*/
@media (max-width: 1279px) {


  .navbar a,
  .navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-family: var(--font-primary);
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    transition: 0.3s;
  }

  .navbar a i,
  .navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  .navbar a:hover,
  .navbar .active,
  .navbar .active:focus,
  .navbar li:hover>a {
    color: #fff;
  }

  .navbar .getstarted,
  .navbar .getstarted:focus {
    background: var(--color-primary);
    padding: 8px 20px;
    border-radius: 4px;
    margin: 15px;
    color: #fff;
  }

  .navbar .getstarted:hover,
  .navbar .getstarted:focus:hover {
    color: #fff;
    background: rgba(0, 131, 116, 0.8);
  }

  .navbar .dropdown ul,
  .navbar .dropdown .dropdown ul {
    position: static;
    padding: 10px 0;
    margin: 10px 20px;
    transition: all 0.5s ease-in-out;
    background-color: #007466;
    border: 1px solid #006459;
  }

  .navbar .dropdown>.dropdown-active,
  .navbar .dropdown .dropdown>.dropdown-active {
    display: block;
  }


}

/*--------------------------------------------------------------
# Desktop Navigation
--------------------------------------------------------------*/
@media (min-width: 1280px) {
  .navbar {
    padding: 0;
  }

  .navbar ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
  }

  .navbar li {
    position: relative;
  }

  .navbar>ul>li {
    white-space: nowrap;
    padding: 10px 0 10px 28px;
  }

  .navbar a,
  .navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    font-family: var(--font-secondary);
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    transition: 0.3s;
    position: relative;
  }

  .navbar a i,
  .navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  .navbar>ul>li>a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -6px;
    left: 0;
    background-color: var(--color-secondary);
    visibility: hidden;
    width: 0px;
    transition: all 0.3s ease-in-out 0s;
  }

  .navbar a:hover:before,
  .navbar li:hover>a:before,
  .navbar .active:before {
    visibility: visible;
    width: 100%;
  }

  .navbar a:hover,
  .navbar .active,
  .navbar .active:focus,
  .navbar li:hover>a {
    color: #fff;
  }

  .navbar .dropdown ul {
    display: block;
    position: absolute;
    left: 28px;
    top: calc(100% + 30px);
    margin: 0;
    padding: 10px 0;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    background: #fff;
    box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
    transition: 0.3s;
    border-radius: 4px;
  }

  .navbar .dropdown ul li {
    min-width: 200px;
  }

  .navbar .dropdown ul a {
    padding: 10px 20px;
    font-size: 15px;
    text-transform: none;
    font-weight: 600;
    color: #006a5d;
  }

  .navbar .dropdown ul a i {
    font-size: 12px;
  }

  .navbar .dropdown ul a:hover,
  .navbar .dropdown ul .active:hover,
  .navbar .dropdown ul li:hover>a {
    color: var(--color-secondary);
  }

  .navbar .dropdown:hover>ul {
    opacity: 1;
    top: 100%;
    visibility: visible;
  }

  .navbar .dropdown .dropdown ul {
    top: 0;
    left: calc(100% - 30px);
    visibility: hidden;
  }

  .navbar .dropdown .dropdown:hover>ul {
    opacity: 1;
    top: 0;
    left: 100%;
    visibility: visible;
  }
}

@media (min-width: 1280px) and (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
    left: -90%;
  }

  .navbar .dropdown .dropdown:hover>ul {
    left: -100%;
  }
}

@media (min-width: 1280px) {

  .mobile-nav-show,
  .mobile-nav-hide {
    display: none;
  }
}
</style>