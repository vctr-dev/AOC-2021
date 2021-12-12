const { getDataFromFile, iterateMatrix, getAround } = require("../utils");

const a = getDataFromFile("a");
const b = getDataFromFile("b");

function parse(params) {
	return params.split("\n").map((v) => v.split("").map((w) => ~~w));
}

function setPoint(matrix, point, val) {
	matrix[point.y][point.x] = val;
}

function step(params) {
	let newState = params.map((v) => v.map((w) => w + 1));
	const flashQueue = [];
	const flashed = {};
	const flashedArr = [];
	iterateMatrix(newState, (val, x, y) => val > 9 && flashQueue.push({ x, y }));
	while (flashQueue.length) {
		const next = flashQueue.pop();
		if (flashed[next.x]?.has(next.y)) continue;
		flashed[next.x] = flashed[next.x] || new Set();
		flashed[next.x].add(next.y);
		flashedArr.push(next);

		// flash things around
		getAround(newState, next, true).forEach(({ point, val }) => {
			const newVal = val + 1;
			setPoint(newState, point, newVal);
			if (newVal > 9) {
				flashQueue.push(point);
			}
		});
	}
	flashedArr.forEach((p) => setPoint(newState, p, 0));
	return { newState, flashes: flashedArr.length };
}

function partOne(params) {
	let state = params;
	let steps = 1;
	while (true) {
		const res = step(state);
		state = res.newState;
		if (res.flashes === 100) {
			return steps;
		}
		steps++;
	}
}

console.log(partOne(parse(b)));
