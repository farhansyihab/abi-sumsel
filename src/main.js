import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
// import 'bootstrap/js/index.esm.js'
import 'bootstrap/js/dist/carousel.js'
import 'bootstrap/js/dist/base-component.js'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
// import 'bootstrap/js/dist/button.js'
import './assets/css/main.css'

import { createApp } from 'vue'
// import './assets/style/style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';

import { dataAnggotaServ } from './firebase/dataAnggotaClass.js'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from './firebase/firebaseSettings.js'
import blogKey from './firebase/DataService.js';
import { checkForUpdates } from '@/utils/blogUpdater';

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth        = getAuth(firebaseApp);
const fbDatabase  = getDatabase(firebaseApp);


//createApp(App).mount('#app')
createApp(App)
  .use(createPinia())
  .use(router)
  .use(firebaseApp)
  .use(fbDatabase)
  .use(auth)
  .use(CKEditor)
  .mount('#app')


  const baseURL         = window.location.origin + '/';
  const penyimpanan     = window.localStorage ;
  const kunciBlog       = blogKey();

    function loadBlogData(){
        const myWorker        = new Worker(new URL('@worker/blog.worker.js', import.meta.url));
        myWorker.postMessage(kunciBlog);
        myWorker.onmessage = (e) => {
            penyimpanan.setItem("dataBlog", JSON.stringify(e.data.items)); 
        }
    }

    loadBlogData();

     // Cek update setiap 30 menit
    setInterval(() => {
        checkForUpdates(kunciBlog, () => {
        loadBlogData(); // Panggil ini jika ada update
        });
    }, 30 * 60 * 1000);

  let token ;
  onAuthStateChanged(auth, (user) => {
    if(user){
      token = user.accessToken
      const wrkDataAnggota  =  new Worker(new URL('dataAnggotaWorker.js', baseURL));
      wrkDataAnggota.postMessage(token);
      wrkDataAnggota.onmessage = (e) => {
        penyimpanan.setItem("dataAnggota", JSON.stringify(e.data)); 
      }
    }else{
      token = ''
    }
  })
  
  
