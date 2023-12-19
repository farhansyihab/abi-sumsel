import { defineStore } from "pinia";
import { getDatabase, ref, onValue , update } from "firebase/database";

export const countdown = defineStore({
    id: "countdown",
    state: () => ({
        batasTanggal: null,
        detail: null,
        judul: null,
        nama: null,
        tampil: false,
    }),
    getters: {
        getData: function (state) {
            if (state.batasTanggal !== null) {
                return state;
            } else {
                return "";
            }
        },
    },
    actions: {
        SET_COUNTDOWN ( data) {
            if(data){
                this.batasTanggal  = data.batasTanggal;
                this.detail        = data.detail;
                this.judul         = data.judul;
                this.nama          = data.nama;
                this.tampil        = data.tampil;
            }
        },
        STOP_COUNTDOWN() {
            this.batasTanggal  = null ;
            this.detail        = null ;
            this.judul         = null ;
            this.nama          = null ;
            this.tampil        = false ;
        },
        updateCountdown(dataCountdown){
            const setCountdown    = this.SET_COUNTDOWN
            const db        = getDatabase();
            const tblref    = ref(db, '/countdown');
            const updates   =  { 
                                batasTanggal: dataCountdown.batasTanggal, 
                                detail: dataCountdown.detail, 
                                judul: dataCountdown.judul,
                                nama: dataCountdown.nama,
                                tampil: dataCountdown.tampil
                            } ;
            return new Promise(function(resolve, reject) {
                try {
                    update(tblref, updates);
                    setCountdown(updates);
                    const penyimpanan   = window.localStorage;
                    penyimpanan.setItem("dataCountDown", JSON.stringify(updates));
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            })
        },
        getCountdown() {
            const setCountdown    = this.SET_COUNTDOWN
            const db        = getDatabase();
            const tblref    = ref(db, '/countdown');
            return new Promise(function(resolve, reject){
                try {
                    onValue(tblref, (snapshot) => {
                        const dtCountdown = {
                            batasTanggal: snapshot.val().batasTanggal,
                            detail: snapshot.val().detail,
                            judul: snapshot.val().judul,                  
                            nama: snapshot.val().nama,
                            tampil: snapshot.val().tampil
                        }
                        const penyimpanan   = window.localStorage;
                        penyimpanan.setItem("dataCountDown", JSON.stringify(dtCountdown));                      
                        setCountdown(dtCountdown);
                        resolve(dtCountdown)
                    }, { onlyOnce : true})
                } catch (error) {
                    reject(error)
                }
            })        
        }
    }
})
