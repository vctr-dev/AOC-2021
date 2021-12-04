const { getDataFromFile } = require("../utils");

const e1 = getDataFromFile("e1");
const one = getDataFromFile("1");

const parse = (input) =>
	input.split("\n").map((l) => l.split("").map((b) => ~~b));

const partOne = (input) => {
	const count = [];
	const p = parse(input);
	p.forEach((l) => l.forEach((b, i) => (count[i] = (count[i] || 0) + b)));
	const len = p.length;
	const b = count.map((n) => (n > len / 2 ? 1 : 0)).join("");
	const c = count.map((n) => (n > len / 2 ? 0 : 1)).join("");

	return [parseInt(b, 2), parseInt(c, 2)];
};

const partTwo = (input) => {
	const p = parse(input);
	return parseInt(getO(p).join(""), 2) * parseInt(getC(p).join(""), 2);
};

const getCount = (p) => {
	const count = [];
	p.forEach((l) => l.forEach((b, i) => (count[i] = (count[i] || 0) + b)));
	return count;
};

const getO = (p) => {
	let f = p;
	const len = p[0].length;
	for (let i = 0; i < len; i++) {
		if (f.length === 1) break;
		const g = getCount(f)[i] >= f.length / 2 ? 1 : 0;
		f = f.filter((l) => l[i] === g);
	}
	return f[0];
};
const getC = (p) => {
	let f = p;
	const len = p[0].length;
	for (let i = 0; i < len; i++) {
		if (f.length === 1) break;
		const g = getCount(f)[i] >= f.length / 2 ? 0 : 1;
		f = f.filter((l) => l[i] === g);
	}
	return f[0];
};

console.log(partTwo(one));
