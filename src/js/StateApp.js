export default class State {
	constructor() {
		this.pricelist = [];
		this.nextId = 0;
	}

	saveState() {
		const myPricelist = JSON.stringify(this);
		localStorage.setItem("pricelist", myPricelist);
	}

	loadState() {
		const myPricelistJSON = localStorage.getItem("pricelist");
		const myPricelist = JSON.parse(myPricelistJSON);

		return myPricelist;
	}
}
