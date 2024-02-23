/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validEditFunc.js
const formattingPrice = price => {
  const stringPrice = price.toString();
  const arrayPrice = stringPrice.split("");
  const priceWithSpace = [];
  const firstSection = arrayPrice.length % 3;
  if (firstSection > 0 && arrayPrice.length > 2) {
    for (let i = 0; i < firstSection; i += 1) {
      const nextNumber = arrayPrice.shift();
      priceWithSpace.push(nextNumber);
    }
    priceWithSpace.push(" ");
  }
  const lengthArray = arrayPrice.length;
  for (let i = 0; i < lengthArray; i += 1) {
    const nextNumber = arrayPrice.shift();
    priceWithSpace.push(nextNumber);
    if (arrayPrice.length > 0 && (i + 1) % 3 === 0) {
      priceWithSpace.push(" ");
    }
  }
  const stringSpiceWithSpace = priceWithSpace.join("");
  return stringSpiceWithSpace;
};

;// CONCATENATED MODULE: ./src/js/RenderApp.js


// const testProducts = [
// 	{
// 		name: "Apple iPhone 15 Pro Max 256 ГБ",
// 		price: "160199",
// 	},
// 	{
// 		name: "Samsung Galaxy S24 Ultra 512 ГБ",
// 		price: "159999",
// 	},
// 	{
// 		name: "Sony Xperia 1 III 256 ГБ",
// 		price: "116999",
// 	},
// ];
// this.renderElementPricelist(testProducts[0]);
// this.renderElementPricelist(testProducts[1]);
// this.renderElementPricelist(testProducts[2])

class Render {
  constructor(container) {
    this.container = container;
    this.listenerPricelist = [];
    this.listenerAddNewProduct = [];
    this.listenerAddProductButtons = [];
    this.listenerRemoveProductButtons = [];
    this.renderPage();
    this.registerEventListeners();
  }
  renderPage() {
    const header = this.renderHeader();
    this.header = header;
    this.container.append(header);
    const main = this.renderMain();
    this.container.append(main);
    const footer = this.renderFooter();
    this.footer = footer;
    this.container.append(footer);
  }
  registerEventListeners() {
    this.headerAdd.addEventListener("click", event => {
      event.preventDefault();
      this.listenerAddNewProduct.map(item => {
        item();
      });
    });
    this.pricelist.addEventListener("click", event => {
      event.preventDefault();
      this.listenerPricelist.map(item => {
        item(event);
      });
    });
    this.addProductSaveButton.addEventListener("click", event => {
      event.preventDefault();
      this.listenerAddProductButtons.map(item => {
        item(event);
      });
    });
    this.addProductCancelButton.addEventListener("click", event => {
      event.preventDefault();
      this.listenerAddProductButtons.map(item => {
        item(event);
      });
    });
    this.removeProductButtonConfirm.addEventListener("click", event => {
      event.preventDefault();
      this.listenerRemoveProductButtons.map(item => {
        item(event);
      });
    });
    this.removeProductButtonCancel.addEventListener("click", () => {
      event.preventDefault();
      this.listenerRemoveProductButtons.map(item => {
        item(event);
      });
    });
  }
  renderHeader() {
    const header = document.createElement("header");
    header.classList.add("container", "header");
    const headerTitle = document.createElement("div");
    headerTitle.classList.add("header-title");
    headerTitle.textContent = `Список товаров`;
    const headerAdd = document.createElement("div");
    headerAdd.classList.add("header-add");
    headerAdd.textContent = `+`;
    this.headerAdd = headerAdd;
    header.append(headerTitle, headerAdd);
    return header;
  }
  renderMain() {
    const main = document.createElement("main");
    main.classList.add("container", "main");
    const modal = this.renderModal();
    this.modal = modal;
    const pricelist = this.renderPricelist();
    this.pricelist = pricelist;
    main.append(modal, pricelist);
    return main;
  }
  renderModal() {
    const modal = document.createElement("aside");
    modal.classList.add("modal");
    const productForm = this.renderProductForm();
    const productDeleteConfirm = this.renderProductDeleteConfirm();
    modal.append(productForm, productDeleteConfirm);
    return modal;
  }
  renderPricelist() {
    const pricelist = document.createElement("ul");
    pricelist.classList.add("pricelist");
    const pricelistHeader = this.renderPriceListHeader();
    pricelist.append(pricelistHeader);
    return pricelist;
  }
  renderPriceListHeader() {
    const headerEl = document.createElement("li");
    headerEl.classList.add("pricelist-item", "pricelist-header");
    headerEl.innerHTML = `
			<div class="pricelist-item__name pricelist-header__name">
				Название:
			</div>
			<div class="pricelist-item__price pricelist-header__price">
				Стоимость:
			</div>
			<div class="pricelist-item__actions pricelist-header__actions">
				Действия:
			</div>
		`;
    return headerEl;
  }
  renderElementPricelist(product) {
    const formattedPrice = formattingPrice(product.price);
    const productEl = document.createElement("li");
    productEl.classList.add("pricelist-item");
    productEl.dataset.id = product.id;
    productEl.innerHTML = `
			<div class="pricelist-item__name">
				${product.name}
			</div>
			<div class="pricelist-item__price">
				${formattedPrice}
			</div>
			<div class="pricelist-item__actions">
				<p class="pricelist-item__actions-item pricelist-item__actions-edit">
					&#9998;
				</p>
				<p class="pricelist-item__actions-item pricelist-item__actions-remove">
					&#10006;
				</p>
			</div>
		`;
    this.pricelist.append(productEl);
  }
  renderProductForm(idEdit = false) {
    const productForm = document.createElement("form");
    productForm.setAttribute("action", "");
    productForm.setAttribute("method", "POST");
    productForm.dataset.idEdit = idEdit;
    productForm.classList.add("add-product", "hidden-item");
    productForm.innerHTML = `
			<label for="add-product-name" class="add-product-label add-product-name">
				<p class="add-product-label__title add-product-name__title">
					Название:
				</p>
				<input id="add-product-name" type="text" class="add-product-label__input add-product-name__input">
				<p class="add-product-label__error add-product-name__error">
					<span class="text-error hidden-item">Текст ошибки</span>
					<span>&nbsp;</span>
				</p>
			</label>
			
			<label for="add-product-price" class="add-product-label add-product-price">
				<p class="add-product-label__title add-product-price__title">
					Стоимость:
				</p>
				<input id="add-product-price" type="number" class="add-product-label__input add-product-price__input">
				<p class="add-product-label__error add-product-price__error">
					<span class="text-error hidden-item">Текст ошибки</span>
					<span>&nbsp;</span>
				</p>
			</label>

			<div class="product-buttons add-product-buttons">
				<button class="button add-product-button add-product-save">
					Сохранить
				</button>
				<button class="button add-product-button add-product-cancel">
					Отмена
				</button>
			</div>
		`;
    this.saveElementsForm(productForm);
    return productForm;
  }
  saveElementsForm(container) {
    this.productForm = container;
    this.addProductNameInput = container.querySelector(".add-product-name__input");
    this.addProductNameError = container.querySelector(".add-product-name__error");
    this.addProductPriceInput = container.querySelector(".add-product-price__input");
    this.addProductPriceError = container.querySelector(".add-product-price__error");
    this.addProductSaveButton = container.querySelector(".add-product-save");
    this.addProductCancelButton = container.querySelector(".add-product-cancel");
  }
  fillingProductFormEdit(product) {
    if (!product) {
      return;
    }
    this.addProductNameInput.value = product.name;
    this.addProductPriceInput.value = product.price;
    this.showForm();
    this.productForm.dataset.idEdit = product.id;
  }
  renderProductDeleteConfirm() {
    const productDeleteConfirm = document.createElement("div");
    productDeleteConfirm.classList.add("remove-product", "hidden-item");
    productDeleteConfirm.dataset.id = "false;";
    productDeleteConfirm.innerHTML = `
			<div class="remove-product-text add-product-name">
				<p class="remove-product-text__title">
					Вы действительно хотите удалить:
				</p>
				<p class="remove-product-text__name">
					Название товара
				</p>
			</div>
					
			<div class="product-buttons remove-product-buttons">
				<button class="button remove-product-button remove-product-remove">
					Удалить
				</button>
			
				<button class="button remove-product-button remove-product-cancel">
					Отмена
				</button>
			</div>
		`;
    this.saveElementsDeleteConfirm(productDeleteConfirm);
    return productDeleteConfirm;
  }
  saveElementsDeleteConfirm(container) {
    this.confirmDelete = container;
    this.removeProductName = container.querySelector(".remove-product-text__name");
    this.removeProductButtonConfirm = container.querySelector(".remove-product-remove");
    this.removeProductButtonCancel = container.querySelector(".remove-product-cancel");
  }
  renderFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    return footer;
  }
  updateElementPricelist(product) {
    const container = this.pricelist.querySelector(`[data-id="${product.id}"]`);
    const formattedPrice = formattingPrice(product.price);
    const nameProductContainer = container.querySelector(".pricelist-item__name");
    nameProductContainer.textContent = product.name;
    const priceProductContainer = container.querySelector(".pricelist-item__price");
    priceProductContainer.textContent = formattedPrice;
  }
  removeElementPricelist(id) {
    const product = this.pricelist.querySelector(`[data-id="${id}"]`);
    product.remove();
  }
  addListenerPricelist(callback) {
    this.listenerPricelist.push(callback);
  }
  addListenerAddNewProduct(callback) {
    this.listenerAddNewProduct.push(callback);
  }
  addListenerAddProductButtons(callback) {
    this.listenerAddProductButtons.push(callback);
  }
  addListenerRemoveProductButtons(callback) {
    this.listenerRemoveProductButtons.push(callback);
  }
  showForm() {
    this.productForm.classList.remove("hidden-item");
  }
  hideForm() {
    this.clearForm();
    this.productForm.dataset.idEdit = "false";
    this.productForm.classList.add("hidden-item");
  }
  clearForm() {
    this.addProductNameInput.value = "";
    this.addProductPriceInput.value = "";
  }
  showConfirmDelete(product) {
    if (!product) {
      return;
    }
    this.confirmDelete.classList.remove("hidden-item");
    this.confirmDelete.dataset.id = product.id;
    this.removeProductName.textContent = `${product.name} ?`;
  }
  hideConfirmDelete() {
    this.removeProductName.textContent = "";
    this.confirmDelete.dataset.id = "false";
    this.confirmDelete.classList.add("hidden-item");
  }
  showError(error, container) {
    const wrap = this.productForm.querySelector(`.add-product-${container}__error`);
    const description = wrap.querySelector(".text-error");
    description.textContent = error;
    description.classList.add("invalid");
    description.classList.remove("hidden-item");
  }
  hideError(container) {
    const wrap = this.productForm.querySelector(`.add-product-${container}__error`);
    const description = wrap.querySelector(".text-error");
    description.textContent = "";
    description.classList.add("hidden-item");
    description.classList.remove("invalid");
  }
}
;// CONCATENATED MODULE: ./src/js/StateApp.js
class State {
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
;// CONCATENATED MODULE: ./src/js/MainApp.js



class App {
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
      savedPrice.forEach(item => this.render.renderElementPricelist(item));
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
      price: Number(this.render.addProductPriceInput.value)
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
    const product = this.state.pricelist.find(item => item.id === id);
    this.render.fillingProductFormEdit(product);
  }
  saveUpdatedProduct() {
    const id = Number(this.render.productForm.dataset.idEdit);
    const savedProduct = this.state.pricelist.find(item => item.id === id);
    savedProduct.name = this.render.addProductNameInput.value.trim();
    savedProduct.price = Number(this.render.addProductPriceInput.value);
    this.render.updateElementPricelist(savedProduct);
    this.render.hideForm();
    this.state.saveState();
  }
  confirmRemoveProduct({
    target
  }) {
    const container = target.closest("li");
    const id = Number(container.dataset.id);
    const product = this.state.pricelist.find(item => item.id === id);
    this.render.showConfirmDelete(product);
  }
  removeProduct() {
    const id = Number(this.render.confirmDelete.dataset.id);
    const idProduct = this.state.pricelist.findIndex(item => item.id === id);
    this.state.pricelist.splice(idProduct, 1);
    this.render.removeElementPricelist(id);
    this.state.saveState();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

new App("#app-container");
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;