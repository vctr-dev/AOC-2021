const { getDataFromFile } = require("../utils");

const partOneData = getDataFromFile("./partOneData.txt");
const partOneExample = getDataFromFile("./partOneExample.txt");
const partTwoData = getDataFromFile("./partTwoData.txt");
const partTwoExample = getDataFromFile("./partTwoExample.txt");

const parsePartOneInput = (input) => input.split("\n").map((n) => ~~n);

const partOne = (input) => {
	const parsed = parsePartOneInput(input);
	let count = 0;
	for (let index = 1; index < parsed.length; index++) {
		if (parsed[index] > parsed[index - 1]) count++;
	}
	return count;
};

const parsePartTwoInput = parsePartOneInput;
const partTwo = (input) => {
	const p = parsePartTwoInput(input);
	let count = 0;
	for (let i = 3; i < p.length; i++) {
		const prev = p[i - 3] + p[i - 2] + p[i - 1];
		const cur = p[i - 2] + p[i - 1] + p[i];
		if (prev < cur) count++;
	}
	return count;
};

console.log(partTwo(partTwoData));
