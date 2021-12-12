const { getDataFromFile } = require("../utils");
const a = getDataFromFile("a");
const b = getDataFromFile("b");

function parse(params) {
	return params.split(",").map((a) => ~~a);
}

function partOne(params) {
	const bounds = [Math.min(...params), Math.max(...params)];
	let leastFuel = Infinity;
	for (let i = bounds[0]; i < bounds[1]; i++) {
		leastFuel = Math.min(
			leastFuel,
			// part one
			// params.reduce((a, c) => a + Math.abs(c - i), 0)
			params.reduce((a, c) => a + sumOfSeries(Math.abs(c - i)), 0)
		);
	}
	return leastFuel;
}
function sumOfSeries(param) {
	return (param * (param + 1)) / 2;
}

console.log(partOne(parse(b)));
