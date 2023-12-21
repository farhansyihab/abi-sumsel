class dataAnggota{
    #authToken;
    #fullURL;

    constructor(token){
        this.#authToken = token;
        this.#fullURL   = 'https://abi-sumsel-default-rtdb.asia-southeast1.firebasedatabase.app/anggota.json?auth=' + token;
    }

    getAllData(){
        const urlData       = this.#fullURL
        return new Promise(function(resolve,reject) {
            try {
                fetch(urlData, {
                    method: "GET",
                    headers: {"Content-Type": "application/json",}
                })
                .then((response) => { return response.json(); })
                .then((data) => {
                    resolve(data) 
                })
            } catch (error) {
                reject(error)
            }
        })  
    }    
}



self.onmessage = (e) => {
    if(e.data !== undefined) {
        const dtAnggota = new dataAnggota(e.data)
        dtAnggota.getAllData().then((response) => {
            self.postMessage(response)
        }).catch((error) => {
            self.postMessage(error);
        })
    }
};