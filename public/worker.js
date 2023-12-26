/** untuk ambil data dari BLog */
class blogDataService{
    #key    = "";
    #api    = "https://www.googleapis.com/blogger/v3/blogs";
    #blogId = "";
    url     = "";

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
                .then((data) => { 
                    const arrData = data.items
                    const dataBlog = arrData.map((element) => {
                        const isiKonten = element.content;
                        let strContent ;
                        let strMeta ;
                        if(isiKonten.indexOf("<!--pisah-->") > 0){
                            const strElement = element.content
                            const pisah = strElement.split("<!--pisah-->");
                            strContent = pisah[0];
                            strMeta = pisah[1]
                        }else{
                            strContent = isiKonten;
                            strMeta = '';
                        }
                        return ({id: element.id, title: element.title, content: strContent, meta: strMeta});
                    })
                    const dtBlog = {
                        kind: "blogger#postList", nextPageToken: "CgkIChjBz4_nxzEQ5pDEh-P16JMDGAA", items: dataBlog
                    }
                    resolve(dtBlog) ;
                 })
            } catch (error) {
                reject(error)
            }
        })  
    }
 } /** akhir dari bagian blog */


self.onmessage = (e) => {
    if(e.data !== undefined) {
         const blogData = new blogDataService(e.data.kunci, e.data.blogId)
         blogData.getAllData().then((response) => {
             self.postMessage(response)
         }).catch((error) => {
             self.postMessage(error);
         })
    }
};