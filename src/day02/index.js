const { getDataFromFile } = require("../utils");

const e1 = getDataFromFile("data/e1");
const one = getDataFromFile("data/1");

const parse = (input) =>
	input
		.split("\n")
		.map((l) => l.split(" "))
		.map(([dir, mag]) => ({
			dir: dir === "up" || dir === "down" ? 0 : 1,
			mag: dir == "up" ? -~~mag : ~~mag,
		}));

function partOne(input) {
	const start = [0, 0];
	parse(input).forEach(({ dir, mag }) => {
		start[dir] += mag;
	});
	const res = start[0] * start[1];
	return res;
}

function partTwo(input) {
	const start = [0, 0, 0]; // aim, pos, depth
	parse(input).forEach(({ dir, mag }) => {
		start[dir] += mag;
		if (dir) start[2] += start[0] * mag;
	});
	const res = start[1] * start[2];
	return res;
}

console.log(partTwo(one));
