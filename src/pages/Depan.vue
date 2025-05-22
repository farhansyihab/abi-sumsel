<template>
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="hero">
    <div class="container position-relative">
      <div class="row gy-5" data-aos="fade-in">

        <div class="col-lg-4 order-3 order-lg-2 d-flex flex-column justify-content-center text-center text-lg-start">
          <h2>DPW <span>ABI SUMSEL</span></h2>
          <p>Sinergi khidmad untuk bangsa yang bermartabat</p>
          <div class="d-flex justify-content-center justify-content-lg-start">
            <!-- <a href="#about" class="btn-get-started">Get Started</a> -->
          </div>
        </div>

        <div class="col-lg-6 order-2 order-lg-3">
          <img src="/img/logoabi.png" class="img-fluid" alt="ABI SUMSEL">
        </div>
      </div>
    </div>

    <div class="icon-boxes position-relative">
      <div class="container position-relative">
        <div class="row gy-4 mt-5">

          <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-easel"></i></div>
              <h4 class="title"><a href="/about" class="stretched-link">Tentang ABI</a></h4>
            </div>
          </div><!--End Icon Box -->

          <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-microsoft-teams"></i></div>
              <h4 class="title"><a href="/team" class="stretched-link">Struktur Organisasi</a></h4>
            </div>
          </div><!--End Icon Box -->

          <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-info-lg"></i></div>
              <h4 class="title"><a href="/info" class="stretched-link">Info ABI SUMSEL</a></h4>
            </div>
          </div><!--End Icon Box -->

          <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-whatsapp"></i></div>
              <h4 class="title"><a href="/kontak" class="stretched-link">Hubungi Kami</a></h4>
            </div>
          </div><!--End Icon Box -->

        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Section -->
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { getDatabase, ref, onValue } from 'firebase/database'
import { MainTag, sosmedTag } from '../components/classMainTag.js'
const db = getDatabase()
export default {
    name: "Depan",
    data() {
      return { }
    },
    created() {},
    methods:{
      formatDate(date){
            const tgl           = new Date(date)
            const monthNames    = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            const day           = tgl.getDate();
            const monthIndex    = tgl.getMonth();
            const year          = tgl.getFullYear();
            return monthNames[monthIndex]+ ' ' + day   + ',' + year;
        },      
    }
}
</script>