import { defineStore } from "pinia";
import router from "../../router/index.js"
import { signInWithEmailAndPassword, signOut, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getDatabase, ref, onValue , update } from "firebase/database";
const auth = getAuth()

export const dataUsers = defineStore({
    id: "datacontact",
    state: () => ({
        user: null,
        displayName: null,
        urlPhoto: null,
        email: null,
        noTelp: null,
        statusLogin: false,
        credential: null,
        token: null
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
        getStatusLogin: (state) => state.statusLogin
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
        SET_KREDENSIAL(kredensial){
            this.credential = kredensial
        },
        SET_TOKEN(token){
            this.token = token
        },
        simpanKePenyimpanan(){
            const penyimpanan   = window.localStorage;
            const datanya = {
                user : this.user,
                displayName: this.displayName,
                urlPhoto: this.urlPhoto,
                email: this.email,
                noTelp: this.noTelp,
                statusLogin: this.statusLogin,
                credential: this.credential,
                token: this.token
            }
            penyimpanan.setItem("dataUser", JSON.stringify(datanya)); 
        },
        hapusPenyimpanan(){
            const penyimpanan   = window.localStorage;
            penyimpanan.removeItem("dataUser"); 
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
            router.push('/')
        },
        async loginWithGoogle(){
            const provider          = new GoogleAuthProvider();
            const setUser           = this.SET_USER
            const setInfo           = this.SET_INFO
            const setKredensial     = this.SET_KREDENSIAL
            const setToken          = this.SET_TOKEN
            const simpanLokal       = this.simpanKePenyimpanan
            try{
                await signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result)
                    setKredensial(credential)
                    setToken(result.user.accessToken)
                    setUser(result.user)
                    simpanLokal()
                    const userdt    =  {
                        displayName: result.user.displayName,
                        urlPhoto: result.user.photoURL,
                        noTelp: result.user.phoneNumber,
                    }
                    setInfo(userdt) 
                    router.push('/')
                })
                .catch((error) => {  return "ada error : "+ error })
            }catch (error) { 
                console.log("ada kesalahan : "+ error)
                return
            }
        },
        // async register ( {commit}, details) {
    
        // },
        async logout() {
            const clearUser = this.CLEAR_USER
            const hapusLokal = this.hapusPenyimpanan
            await signOut(auth)
            hapusLokal()
            clearUser()
            router.push('/')
        },
        fetchUser() {
            auth.onAuthStateChanged( async user => {
                if(user === null){
                    this.CLEAR_USER()
                }else{
                    this.SET_USER(user)
                    this.SET_INFO(user)
                    if(router.isReady() && router.currentRoute.value.path === '/login'){
                        router.push('/')
                    }
                }
            })
        },
        cekLogin(){
            const clearUser     = this.CLEAR_USER
            const setUser       = this.SET_USER
            const setToken      = this.SET_TOKEN
            const simpanLokal   = this.simpanKePenyimpanan            
            return new Promise(function(resolve, reject){
                try {
                    auth.onAuthStateChanged( async user => {
                        if(user === null){
                            clearUser()
                            resolve(false)
                        }else{                          
                            resolve(user)
                            setToken(result.user.accessToken)
                            setUser(result.user)
                            simpanLokal()
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