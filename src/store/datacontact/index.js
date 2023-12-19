import { defineStore } from "pinia";
import { getDatabase, ref, onValue } from "firebase/database";


export const datacontact = defineStore({
    id: "datacontact",
    state: () => ({
        datacontact: null
    }),
    getters: {
        getData : (state) => {
            if(state.datacontact !== null) {
                return state;
            } else {
                return "";
            }
        },
    },
    actions: {
        SET_DATA (data) {
            if(data){
                this.datacontact  = data;
            }
        },
        getData() {
            const setData   = this.SET_DATA
            const db        = getDatabase();
            const tblref    = ref(db, '/frmContact');
            return new Promise(function(resolve, reject){
                try {
                    onValue(tblref, (snapshot) => {
                        const dtcontact = snapshot.val()
                        const penyimpanan   = window.localStorage;
                        penyimpanan.setItem("datacontact", JSON.stringify(dtcontact));                      
                        setData(dtcontact);                
                        resolve(dtcontact)
                    }, { onlyOnce : true})
                } catch (error) {
                    reject(error)
                }
            })        
        }
    }
})