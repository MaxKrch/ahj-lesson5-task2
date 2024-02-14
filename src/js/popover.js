const popoverToggle = (event, nameContainer) => {
	//не будем усложнять, будет считать разметку стандартной
	const container = searchButtonContainer(event.target, nameContainer);
	if (!container) {
		console.log("enpty container!");
		return;
	}

	renderPopover(container);
};

const searchButtonContainer = (target, nameContainer) => {
	const container = target.closest(nameContainer);
	return container;
};

const deletePopover = () => {
	const oldPopover = [...document.querySelectorAll(".active")];

	oldPopover.map((item) => {
		item.classList.remove("active");
		deleteElementPopover(item);
	});

	deleteElementPopover();
};

const deleteElementPopover = () => {
	const popover = [...document.querySelectorAll(".popover")];
	popover.map((item) => item.remove());
};

const renderPopover = (container) => {
	const isActive = container.classList.contains("active");

	if (isActive) {
		deletePopover();
		return;
	}

	deletePopover();

	container.classList.add("active");
	const popover = document.createElement("aside");
	const titlePopover = container.dataset.contentTitle;
	const textPopover = container.dataset.contentDescr;

	popover.classList.add("popover");
	const html = `	
		<div class="popover-wrap">
			<div class="popover-title">
				${titlePopover}
			</div>
			<div class="popover-text">
				${textPopover}
			</div>
			<div class="popover-array">
			</div>
		</div>
	`;
	const button = container.querySelector(".toggle-button__button");
	const coord = button.getBoundingClientRect();
	const height = coord.height;
	let leftShift = coord.width / 2;

	popover.style.bottom = `${height}px`;
	popover.style.left = `${leftShift}px`;
	popover.style.transform = "translate(-50%)";

	popover.innerHTML = html;
	container.append(popover);
};

export default popoverToggle;
