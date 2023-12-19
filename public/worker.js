/** untuk ambil data dari BLog */
class blogDataService{
    #key    = "";
    #api    = "https://www.googleapis.com/blogger/v3/blogs";
    #blogId = "";
    url     = ""

    constructor(kunci, idBlog){
        this.#key       = kunci;
        this.#blogId    = idBlog;
        this.url        = `${this.#api}/${this.#blogId}/posts?key=${this.#key}`;
    }

    getAllData(){
        const urlData = this.url
        return new Promise(function(resolve,reject) {
            try {
                fetch(urlData, {
                    method: "GET",
                    headers: {"Content-Type": "application/json",}
                })
                .then((response) => { return response.json(); })
                .then((data) => { resolve(data) })
            } catch (error) {
                reject(error)
            }
        })  
    }
 } /** akhir dari bagian blog */


self.onmessage = (e) => {
    if(e.data !== undefined) {
        // console.log('data yang diterima dari main adalah : ' + e.data.blogId)
         const blogData = new blogDataService(e.data.kunci, e.data.blogId)
         blogData.getAllData().then((response) => {
             self.postMessage(response)
         }).catch((error) => {
             self.postMessage(error);
         })
    }
   };