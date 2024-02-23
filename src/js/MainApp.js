import Render from "./RenderApp";
import State from "./StateApp";
import {} from "./validEditFunc";

export default class App {
	constructor(appContainer) {
		this.container = document.querySelector(appContainer);
		this.render = new Render(this.container);
		this.state = new State();

		this.init();
	}

	init() {
		this.addEventListeners();
		this.loadSavedPricelist();
	}

	loadSavedPricelist() {
		const savedPricelist = this.state.loadState();
		if (savedPricelist) {
			this.state.nextId = savedPricelist.nextId;

			const savedPrice = savedPricelist.pricelist;
			this.state.pricelist = savedPrice;
			savedPrice.forEach((item) => this.render.renderElementPricelist(item));
		}
	}

	addEventListeners() {
		this.render.addListenerPricelist(this.actionPricelist.bind(this));
		this.render.addListenerAddNewProduct(this.actionAddNewProduct.bind(this));
		this.render.addListenerAddProductButtons(this.actionAddProductButtons.bind(this));
		this.render.addListenerRemoveProductButtons(this.actionRemoveProductButtons.bind(this));
	}

	actionPricelist(event) {
		if (event.target.classList.contains("pricelist-item__actions-edit")) {
			this.updateProduct(event);
			return;
		}

		if (event.target.classList.contains("pricelist-item__actions-remove")) {
			this.confirmRemoveProduct(event);
			return;
		}
	}

	actionAddNewProduct() {
		this.render.showForm();
	}

	actionAddProductButtons(event) {
		const button = event.target;
		if (button.classList.contains("add-product-cancel")) {
			this.render.clearForm();
			this.render.hideForm();
			return;
		}

		const chekErrorName = this.chekNameProduct(this.render.addProductNameInput.value);
		if (chekErrorName) {
			this.render.showError(chekErrorName, "name");
		} else {
			this.render.hideError("name");
		}

		const chekErrorPrice = this.chekPriceProduct(this.render.addProductPriceInput.value);
		if (chekErrorPrice) {
			this.render.showError(chekErrorPrice, "price");
		} else {
			this.render.hideError("price");
		}

		if (!chekErrorName && !chekErrorPrice) {
			if (this.render.productForm.dataset.idEdit === "false") {
				this.saveProduct();
				return;
			}
			this.saveUpdatedProduct();
		}
	}

	actionRemoveProductButtons(event) {
		if (event.target.classList.contains("remove-product-remove")) {
			this.removeProduct(event);
		}

		this.render.hideConfirmDelete();
	}

	chekNameProduct(text) {
		const length = text.trim().length;

		if (length < 4) {
			return "Название должно быть длиннее 3 символов";
		}

		return false;
	}

	chekPriceProduct(price) {
		if (Number(price) <= 0) {
			return "Цена должна быть больше нуля";
		}

		return false;
	}

	saveProduct() {
		const newProduct = {
			id: this.state.nextId,
			name: this.render.addProductNameInput.value.trim(),
			price: Number(this.render.addProductPriceInput.value),
		};

		this.state.pricelist.push(newProduct);
		this.state.nextId += 1;
		this.render.renderElementPricelist(newProduct);
		this.render.hideForm();
		this.state.saveState();
	}

	updateProduct(event) {
		const container = event.target.closest("li");
		const id = Number(container.dataset.id);
		const product = this.state.pricelist.find((item) => item.id === id);
		this.render.fillingProductFormEdit(product);
	}

	saveUpdatedProduct() {
		const id = Number(this.render.productForm.dataset.idEdit);
		const savedProduct = this.state.pricelist.find((item) => item.id === id);
		savedProduct.name = this.render.addProductNameInput.value.trim();
		savedProduct.price = Number(this.render.addProductPriceInput.value);
		this.render.updateElementPricelist(savedProduct);
		this.render.hideForm();
		this.state.saveState();
	}

	confirmRemoveProduct({ target }) {
		const container = target.closest("li");
		const id = Number(container.dataset.id);
		const product = this.state.pricelist.find((item) => item.id === id);
		this.render.showConfirmDelete(product);
	}

	removeProduct() {
		const id = Number(this.render.confirmDelete.dataset.id);
		const idProduct = this.state.pricelist.findIndex((item) => item.id === id);
		this.state.pricelist.splice(idProduct, 1);

		this.render.removeElementPricelist(id);
		this.state.saveState();
	}
}
