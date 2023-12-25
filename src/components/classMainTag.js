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
        const strTag        = `<${this.#tagName} ${this.#tagAtribute}="${this.#contentOfAtribute}" content="${this.#tagContent}" />`
        return strTag ;
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
        let letStr = []
        if(this.#contentTitle != null){
            letStr.push(`<meta property="og:title" content="${this.#contentTitle}" />`) 
        }
        if(this.#contentDescription != null){
            letStr.push(`<meta property="og:description" content="${this.#contentDescription}" />`)
        }
        if(this.#contentUrl != null){
            letStr.push(`<meta property="og:url" content="${this.#contentUrl}" />`)
        }
        if(this.#contentImage != null){
            letStr.push(`<meta property="og:image" content="${this.#contentImage}" />`)
        }
        return letStr;
    }
}