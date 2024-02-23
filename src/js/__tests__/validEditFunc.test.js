import { formattingPrice } from '../validEditFunc';

const prices = [
	[16512, '16 512'],
	[160000, '160 000'],
	['10587', '10 587'],
]

test.each(prices)('test formatting price %i to %s', (inc, out) => {
	const received = formattingPrice(inc);

	expect(received).toBe(out)
})


