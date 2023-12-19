export class blogDataService{
    #key    = "AIzaSyBQFF7TN9sx8t1D0LHnri71j4NqL6UuvxE";
    #api    = "https://www.googleapis.com/blogger/v3/blogs";
    #blogId = "227330274746239078";
    url     = ""

    constructor(){
        this.url = `${this.#api}/${this.#blogId}/posts?key=${this.#key}`;
    }

    getAllData(){
        const urlData = this.url
        return new Promise(function(resolve,reject) {
            try {
                fetch(this.url, {
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
}