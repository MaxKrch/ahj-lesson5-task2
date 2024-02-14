const registerEvent = (container, event, callback) => {
	const arrayListeners = [...document.querySelectorAll(container)];

	if (arrayListeners.length > 0) {
		arrayListeners.map((item) => {
			item.addEventListener(event, callback);
		});
	}
};

export default registerEvent;
