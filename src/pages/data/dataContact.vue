<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center" v-html="generateHTMLdata">
        </div>
    </div>
</template>

<script>
import { datacontact } from '../../store/datacontact/index.js'
export default {
    name: 'datacontact',
    data() {
        return {
            dataContact: null
        }
    },
    mounted() { this.ambilData()},
    computed: {
        generateHTMLdata() {
            const penyimpanan   = window.localStorage;
            const entries       = penyimpanan.getItem("datacontact");            
            const objData       = JSON.parse(entries)
            const arrObj        = Object.keys(objData)
            let html            = "";
            arrObj.forEach( (item, index) => {
                let htmlData = `<div class="card mb-2 me-2" style="width: 18rem;"> 
                                    <div class="card-header"><h5 class="card-title">${objData[item].subject}</h5></div>
                                    <div class="card-body">
                                        <div class="mb-4">Nama :  ${objData[item].name}</div>
                                        <div class="mb-4">Email :  ${objData[item].email}</div>
                                        <div class="mb-4">Pesan :  ${objData[item].message}</div>
                                    </div>
                                </div>`
                html += htmlData;
                // console.log(objData[item].email )
            })
            return html
        }
    },
    methods: {
        // ...mapActions('datacontact', ['getData']),
        ambilData(){
            const penyimpanan   = window.localStorage;
            const entries       = penyimpanan.getItem("datacontact");
            if(entries !== null){
                try {
                    const objEntries        = JSON.parse(entries)
                    this.dataContact        = objEntries; 
                    datacontact().getData()
                    .then(response => {
                        this.dataContact    = response;
                    })
                    .catch((err) => console.log(err))                              
                } catch (error) {
                    datacontact().getData()
                    .then(response => {
                        this.dataContact    = response;
                    })
                    .catch((err) => console.log(err + '' + error))                  
                }
                // console.log('via localstorage')
            } else {
                datacontact().getData()
                    .then(response => {
                        this.dataContact    = response;
                    })
                    .catch((err) => console.log(err))
                    console.log(`dari firebase`)   
            }//Akhir dari elseif          
        }
    }
}
</script>