const formattingPrice = (price) => {
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

export { formattingPrice };
