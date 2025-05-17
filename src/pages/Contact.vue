<template>
  <main id="main">
    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container">

        <div class="section-header">
          <h2>Hubungi Kami</h2>
          <p>Silahkan menghubungi kami dengan form isian dibawah ini</p>
        </div>

        <div class="row gx-lg-0 gy-4">

          <div class="col-lg-4">

            <div class="info-container d-flex flex-column align-items-center justify-content-center">
              <div class="info-item d-flex">
                <i class="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h4>Alamat:</h4>
                  <p>Jl. Residen Abdul Rozak No.11, Kalidoni, Kec. Kalidoni, Kota Palembang, Sumatera Selatan 30163</p>
                </div>
              </div><!-- End Info Item -->

              <div class="info-item d-flex">
                <i class="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h4>Email:</h4>
                  <p>mynameisdarma@gmail.com</p>
                </div>
              </div><!-- End Info Item -->

              <div class="info-item d-flex">
                <i class="bi bi-phone flex-shrink-0"></i>
                <div>
                  <h4>Telp:</h4>
                  <p>+62 852 6893 99238</p>
                </div>
              </div><!-- End Info Item -->
            </div>

          </div>

          <div id="frmKontak" class="col-lg-8">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input v-model="formContact.name" type="text" name="name" class="form-control" id="name" placeholder="Nama Anda" required>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input v-model="formContact.email" type="email" class="form-control" name="email" id="email" placeholder="Alamat Email" required>
                </div>
              </div>
              <div class="form-group mt-3">
                <input v-model="formContact.subject" type="text" class="form-control" name="subject" id="subject" placeholder="Judul" required>
              </div>
              <div class="form-group mt-3">
                <textarea v-model="formContact.message" class="form-control" name="message" rows="7" placeholder="Ketik pesan Anda disini" required></textarea>
              </div>
              <div class="my-3">
                <!-- <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div> -->
              </div>
              <div class="text-center"><button class="btn btn-primary" @click="saveMessageToFirebase()">Kirim Pesan</button></div>
          </div><!-- End Contact Form -->

        </div>
        <div class="row gx-lg-0 gy-4" style="padding-top: 10px;">
          <div>
            <iframe 
                style="border:0; width: 100%; height: 270px;" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.1223586837723!2d104.79422173139785!3d-2.9616082999999973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b765385dad1c9%3A0x52e1d69da433efbd!2sHusainiyah%20Al%20Mahdi!5e0!3m2!1sid!2sid!4v1679988865674!5m2!1sid!2sid" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>          
        </div>


      </div>
    </section><!-- End Contact Section -->
  </main>
</template>
<script>
import { getDatabase, ref, push } from 'firebase/database'
import { MainTag, sosmedTag } from '../components/classMainTag.js'
const db = getDatabase()
export default { 
  name: 'Contact',
  data(){
    return{
      formContact: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },  
  methods: {
    saveMessageToFirebase() {
      const data          = this.formContact ;
      const reffrmContact = ref(db, 'frmContact')
      push(reffrmContact,data);
      this.formContact.name = ''
      this.formContact.email = ''
      this.formContact.subject = ''
      this.formContact.message = ''
    }
  }
}
</script>

<style scoped>
#frmKontak{
  padding-left: 20px;
  background: #fff;
  box-shadow: 0 2px 25px rgba(0,0,0,.1);
  padding: 20px;
  border-radius: 0 10px 10px 0;  
}
</style>