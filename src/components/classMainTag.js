export class MainTag {
    #tagName ;
    #tagAtribute ;
    #contentOfAtribute ;
    #tagContent ;
    constructor(tagName, atribute, contentOfAtribute, content){
        this.#tagName           = tagName;
        this.#tagAtribute       = atribute;
        this.#contentOfAtribute = contentOfAtribute;
        this.#tagContent        = content;
    }

    generateTag(){
        const objTag = document.createElement(this.#tagName) ;
        objTag.setAttribute(this.#tagAtribute, this.#contentOfAtribute);
        objTag.setAttribute("content", this.#tagContent);
        return objTag;
    }
}

export class sosmedTag{
    #contentTitle ;
    #contentDescription;
    #contentUrl ;
    #contentImage ;

    constructor(title=null, deskripsi=null, image=null, url='https://abi-sumsel.web.app/'){
        this.#contentTitle = title ;
        this.#contentDescription = deskripsi;
        this.#contentUrl = url;
        this.#contentImage = image;
    }

    generateTag(){
        const objTag1 = document.createElement("meta");
        objTag1.setAttribute("property", "og:title");
        const objTag2 = document.createElement("meta");
        objTag2.setAttribute("property", "og:description");
        const objTag3 = document.createElement("meta");
        objTag3.setAttribute("property", "og:url"); 
        const objTag4 = document.createElement("meta");
        objTag4.setAttribute("property", "og:image"); 
        let letArray = []           
        
        if(this.#contentTitle != null){
            objTag1.setAttribute("content",this.#contentTitle);
            letArray.push(objTag1);
        }
        if(this.#contentDescription != null){
            objTag2.setAttribute("content",this.#contentDescription);
            letArray.push(objTag2);
        }
        if(this.#contentUrl != null){
            objTag3.setAttribute("content",this.#contentUrl);
            letArray.push(objTag3);
        }
        if(this.#contentImage != null || this.#contentImage.lenght > 1){
            objTag3.setAttribute("content",this.#contentImage);
            letArray.push(objTag4);
        }
        console.dir(letArray)
        return letArray;
    }
}