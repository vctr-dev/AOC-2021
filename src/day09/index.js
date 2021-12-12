const { getDataFromFile, iterateMatrix, getAround } = require("../utils");

const a = getDataFromFile("a");
const b = getDataFromFile("b");

function parse(params) {
	return params.split("\n").map((v) => v.split("").map((n) => ~~n));
}

function getLowPoints(params) {
	const lowPoints = [];
	iterateMatrix(params, (val, x, y) => {
		const around = getAround(params, { x, y });
		if (around.some(({ val: v }) => v <= val)) return;
		lowPoints.push({ val, point: { x, y } });
	});
	return lowPoints;
}

function getSize(matrix, start) {
	const exploreQueue = [start];
	const explored = {};
	while (exploreQueue.length > 0) {
		const next = exploreQueue.pop();
		explored[next.x] = explored[next.x] || new Set();
		explored[next.x].add(next.y);
		exploreQueue.push(
			...getAround(matrix, next)
				.filter(({ point, val }) => val < 9 && !explored[point.x]?.has(point.y))
				.map(({ point }) => point)
		);
	}
	return Object.values(explored).reduce((a, v) => a + v.size, 0);
}

function partOne(params) {
	return getLowPoints(params).reduce((a, { val }) => a + val + 1, 0);
}

function partTwo(params) {
	const lowPoints = getLowPoints(params);
	const sizes = lowPoints.map((lowPoint) => getSize(params, lowPoint.point));
	return sizes
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, v) => a * v, 1);
}

console.log(partTwo(parse(b)));
