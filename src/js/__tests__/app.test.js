import popoverToggle from "../popover";
import registerEvent from "../eventsFuncs";

describe("create and clear popover", () => {
	const container = document.createElement("main");
	container.classList.add("container");

	const buttonContainer1 = document.createElement("div");
	buttonContainer1.classList.add("toggle-button");
	buttonContainer1.dataset.contentTitle = "test 1";
	buttonContainer1.dataset.contentDescr = "here text for test 1";
	buttonContainer1.innerHTML = `
		<button class="toggle-button__button button1">
			Click for show or hide popover
		</button>
	`;

	const buttonContainer2 = document.createElement("div");
	buttonContainer2.classList.add("toggle-button");
	buttonContainer2.dataset.contentTitle = "test 2";
	buttonContainer2.dataset.contentDescr = "here text for test 2";
	buttonContainer2.innerHTML = `
		<button class="toggle-button__button button2">
			Click for show or hide popover
		</button>
	`;

	document.body.append(container);
	container.append(buttonContainer1);
	container.append(buttonContainer2);

	const button1 = container.querySelector(".button1");
	const button2 = container.querySelector(".button2");

	registerEvent(".toggle-button__button", "click", () => {
		popoverToggle(event, ".toggle-button");
	});

	test("add popover", () => {
		button1.click();
		expect(buttonContainer1.classList.contains("active")).toBeTruthy();
	});

	test("add new popover", () => {
		button2.click();
		expect(buttonContainer1.classList.contains("active")).not.toBeTruthy();
		expect(buttonContainer2.classList.contains("active")).toBeTruthy();
	});

	test("remove popover", () => {
		button2.click();
		expect(buttonContainer2.classList.contains("active")).not.toBeTruthy();
	});
});
