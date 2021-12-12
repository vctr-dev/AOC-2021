const { getDataFromFile } = require("../utils");

const a = getDataFromFile("a");
const b = getDataFromFile("b");

function parse(p) {
	return p
		.split("\n")
		.map((b) => b.match(/(.+),(.+) -> (.+),(.+)/))
		.map((c) => ({
			start: { x: ~~c[1], y: ~~c[2] },
			end: { x: ~~c[3], y: ~~c[4] },
		}));
}

function getLength(start, end) {
	return Math.sqrt(
		Math.abs(start.x - end.x) ** 2 + Math.abs(start.y - end.y) ** 2
	);
}

function pointInSeg(start, end, point) {
	const inProjection =
		(point.y - start.y) * (end.x - start.x) ==
		(end.y - start.y) * (point.x - start.x);
	if (!inProjection) return false;
	const lineLength = getLength(start, end);
	if (Math.max(getLength(start, point), getLength(end, point)) > lineLength)
		return false;
	return true;
}

function getBounds(inputs) {
	return {
		start: {
			x: Math.min(...inputs.map(({ x }) => x)),
			y: Math.min(...inputs.map(({ y }) => y)),
		},
		end: {
			x: Math.max(...inputs.map(({ x }) => x)),
			y: Math.max(...inputs.map(({ y }) => y)),
		},
	};
}

function iterateBounds({ start, end }, fn) {
	for (let x = start.x; x <= end.x; x++)
		for (let y = start.y; y <= end.y; y++) fn(x, y);
}

function partOne(input) {
	const filteredInput = input.filter(
		() => true
		// for part one, filtering only vert/horizontal
		// ({ start, end }) => start.x === end.x || start.y === end.y
	);
	const bounds = getBounds(
		filteredInput.reduce((a, { start, end }) => [...a, start, end], [])
	);
	let count = 0;
	iterateBounds(bounds, (x, y) => {
		const f = filteredInput.filter(({ start, end }) =>
			pointInSeg(start, end, { x, y })
		);
		if (f.length >= 2) count++;
	});
	return count;
}

console.log(partOne(parse(a)));
console.log(partOne(parse(b)));
