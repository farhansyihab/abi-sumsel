export class HTMLTag {
	  constructor(tagName) {
		this.tagName = tagName;
		this.attributes = {};
		this.content = "";
	  }

	  addAttr(attributeName, attributeValue) {
		this.attributes[attributeName] = attributeValue;
		return this;
	  }

	  addContent(content) {
		this.content += content;
		return this;
	  }

	  toString() {
		let htmlTag = "<" + this.tagName;

		for (const attributeName in this.attributes) {
		  const attributeValue = this.attributes[attributeName];
		  attributeValue ? htmlTag += ` ${attributeName}="${attributeValue}"`: htmlTag += ` ${attributeName}`;
		}

		htmlTag += ">";

		if (this.content) {
		  htmlTag += this.content;
		  htmlTag += "</" + this.tagName + ">";
		}

		return htmlTag;
	  }
	}


	export class CardGen {
	  constructor(cardData) {
		this.cardData = cardData;
	  }

	  generateCards() {
		return this.cardData.map(data => this.createCard(data)).join('');
	  }

	  createCard(data) {
		let imgCard			= '';
		let h5BodyCard		= '';
		if(data.image){
			imgCard			= new HTMLTag("img").addAttr("src", data.image).addAttr("class", "card-img-top").addAttr("alt", "Card Image");
		}else{
			imgCard			= '';
		}
		if(data.title){
			h5BodyCard		= new HTMLTag("h5").addAttr("class", "card-title").addContent(data.title);
		}else{
			h5BodyCard		= '';
		}
		
		const pBodyCard		= new HTMLTag("p").addAttr("class", "card-text").addContent(data.description);
		const divBodyCard	= new HTMLTag("div").addAttr("class", "card-body").addContent(h5BodyCard).addContent(pBodyCard)
		const divCard		= new HTMLTag("div").addAttr("class", "card").addContent(imgCard).addContent(divBodyCard);
		
		return divCard;
	  }
	}

	export class BootstrapCarousel {
		constructor() {
			this.items = [];
		}

		addItem(imageSrc, imageAlt, caption) {
			this.items.push({ imageSrc, imageAlt, caption });
			return this;
		}

		generateHtml() {
			const slides = this.items.map((item, index) => `
				<div class="carousel-item${index === 0 ? ' active' : ''}">
					<img src="${item.imageSrc}" class="d-block w-100" alt="${item.imageAlt}">
					      <div class="carousel-caption d-none d-md-block">
						<h5>${item.caption}</h5>
					</div>
				</div>
			`).join('');

			const indicators = this.items.map((item, index) => `
			<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${index === 0 ? ' active' : ''}" aria-current="true" aria-label="Slide ${index+1}"></button>
			`).join('');

			const carouselHtml = `
				<div id="carouselExampleCaptions" class="carousel slide">
					  <div class="carousel-indicators">
						${indicators}
					  </div>

					<div class="carousel-inner">
						${slides}
					</div>
					  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					  </button>
					  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					  </button>
					
				</div>
			`;

			return carouselHtml;
		}
	}
