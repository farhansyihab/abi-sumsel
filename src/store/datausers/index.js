import { defineStore } from "pinia";
import { auth } from '../../../firebase/index.js'
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth"
import { getDatabase, ref, onValue , update } from "firebase/database";

export const dataUsers = defineStore({
    id: "datacontact",
    state: () => ({
        user: null,
        displayName: null,
        urlPhoto: null,
        email: null,
        noTelp: null,
        statusLogin: false,
    }),
    getters: {
        getUserTelp : (state) => {
            if(state.noTelp !== null) {
                return state.noTelp;
            } else {
                return "";
            }
        },
        getUserName: (state) => {
            if(state.displayName !== null) {
                return state.displayName;
            } else {
                return "";
            }
        },
        getUserPhoto: (state) => {
            if(state.urlPhoto !== null) {
                return state.urlPhoto ;
            } else {
                return "";
            }
        },
    },
    actions: {
        SET_USER (user) {
            this.user = user
            if(user){
                this.statusLogin = true;
            }
        },
        CLEAR_USER() {
            this.user = null
            this.statusLogin = false;
        },
        SET_INFO( user) {
            this.displayName   = user.displayName;
            this.urlPhoto      = user.urlPhoto ;
            this.noTelp        = user.noTelp;
        },
        async login ( details) {
            const setUser   = this.SET_USER
            const { email, password } = details ;
    
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User tidak ditemukan')
                        break;
                    
                    case 'auth/wrong-password':
                        alert('Password salah')
                        break;
    
                    default:
                        alert(error.message)
                        break;
                }
                return
            }
            setUser(auth.currentUser);
            window.location.reload();
        },
        // async register ( {commit}, details) {
    
        // },
        async logout( {commit}) {
            const clearUser = this.CLEAR_USER
            await signOut(auth)
    
            clearUser()
    
            router.push('/')
        },
        fetchUser() {
            const clearUser = this.CLEAR_USER
            const setUser   = this.SET_USER
            const setInfo   = this.SET_INFO
            auth.onAuthStateChanged( async user => {
                if(user === null){
                    clearUser()
                }else{
                    setUser(user)
                    setInfo(user)
                    if(router.isReady() && router.currentRoute.value.path === '/login'){
                        router.push('/')
                    }
                }
            })
        },
        cekLogin(){
            const clearUser = this.CLEAR_USER
            const setUser   = this.SET_USER
            const setInfo   = this.SET_INFO
            return new Promise(function(resolve, reject){
                try {
                    auth.onAuthStateChanged( async user => {
                        if(user === null){
                            clearUser()
                            resolve(false)
                        }else{
                            setUser(user)
                            const db        = getDatabase();
                            const userId    = user.uid;
                            const dataUser  = ref(db, '/profileUser/' + userId);
                            onValue(dataUser, (snapshot) => {
                                const userData    =  {
                                    displayName: snapshot.val().namaUser,
                                    urlPhoto: snapshot.val().urlPhoto,
                                    noTelp: snapshot.val().noTelp,
                                }
                                setInfo(userData)                            
                            }, { onlyOnce : true})
                            resolve(true)
                        }
                    })                 
                } catch (error) {
                    reject(error)
                }
            })
        },
        updateDataUser(objData){
            const setUser   = this.SET_USER
            const auth      = getAuth();
            const userId    = auth.currentUser.uid;
            const db        = getDatabase();
            const dataUser  = ref(db, '/profileUser/' + userId);
            // const updates   =  { namaUser: 'coba', noTelp: 'test', urlPhoto: 'url'} ;
            const updates =  { namaUser: objData.namaUser, noTelp: objData.noTelp, urlPhoto: objData.urlPhoto} ;
            return new Promise(function(resolve, reject) {
                try {
                    update(dataUser, updates);
                    setUser(auth.currentUser);
                    resolve(true)
                } catch (error) {
                    reject(error)
                    setUser(auth.currentUser);
                }
            })
        }
    }
})



// import state from './state' ;
// import mutations from './mutations' ;
// import actions from './actions' ;
// import getters from './getters' ;
// const users = {
//     namespaced : true,
//     state,
//     mutations,
//     actions,
//     getters
// }
// export default users ;