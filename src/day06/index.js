const { getDataFromFile } = require("../utils");
const a = getDataFromFile("a");
const b = getDataFromFile("b");

function parse(params) {
	return params.split(",").map((a) => ~~a);
}
function partOne(input) {
	const d = 80;
	let cur = input;
	for (let i = 0; i < d; i++) {
		let next = cur.map((a) => a - 1);
		const numNewborns = next.filter((a) => a === -1).length;
		cur = [
			...next.map((a) => (a === -1 ? 6 : a)),
			...new Array(numNewborns).fill(8),
		];
	}
	return cur.length;
}
function partTwo(input) {
	const d = 256;
	let num = [];
	for (let i = 0; i < 9; i++) {
		num[i] = input.filter((a) => a === i).length;
	}
	for (let i = 0; i < d; i++) {
		num = [
			num[1],
			num[2],
			num[3],
			num[4],
			num[5],
			num[6],
			num[7] + num[0],
			num[8],
			num[0],
		];
	}
	return num.reduce((a, c) => a + c, 0);
}
console.log(partTwo(parse(b)));
