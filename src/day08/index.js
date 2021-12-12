const { getDataFromFile } = require("../utils");
const a = getDataFromFile("a");
const b = getDataFromFile("b");

const numberToLight = [
	[0, 1, 2, 4, 5, 6],
	[2, 5],
	[0, 2, 3, 4, 6],
	[0, 2, 3, 5, 6],
	[1, 2, 3, 5],
	[0, 1, 3, 5, 6],
	[0, 1, 3, 4, 5, 6],
	[0, 2, 5],
	[0, 1, 2, 3, 4, 5, 6],
	[0, 1, 2, 3, 5, 6],
];
function parse(params) {
	return params
		.replaceAll("|\n", "| ")
		.split("\n")
		.map((a) =>
			a
				.match(/^(.+) \| (.+)$/)
				.slice(1, 3)
				.map((b) => b.split(" ").map((c) => c.split("")))
		);
}

function partOne(params) {
	return params.reduce((a, [t, d]) => {
		return a + d.filter((f) => [2, 3, 4, 7].includes(f.length)).length;
	}, 0);
}

function intersect(a, b) {
	return a.filter((c) => b.includes(c));
}

function subtract(a, b) {
	return a.filter((c) => !b.includes(c));
}

function union(a, b) {
	return [...new Set([...a, ...b])];
}

function partTwo(params) {
	return params
		.map(([t, d]) => {
			const p = getSegmentPlacements(t);
			const c = numberToLight.map((v) =>
				v
					.map((n) => p[n])
					.sort()
					.join("")
			);
			return ~~d
				.map((v) => c.findIndex((f) => f === v.sort().join("")))
				.join("");
		})
		.reduce((a, c) => a + c, 0);
}

function getSegmentPlacements(params) {
	const uniq = {
		one: params.find((c) => c.length === 2),
		four: params.find((c) => c.length === 4),
		seven: params.find((c) => c.length === 3),
		eight: params.find((c) => c.length === 7),
	};
	const implied = {
		five: params
			.filter((c) => c.length === 5)
			.reduce((a, c) => {
				return union(a, subtract(uniq.eight, c));
			}, []),
		six: params
			.filter((c) => c.length === 6)
			.reduce((a, c) => union(a, subtract(uniq.eight, c)), []),
	};
	const p = new Array(7);
	p[0] = subtract(uniq.seven, uniq.one)[0];
	p[2] = intersect(implied.six, uniq.one)[0];
	p[5] = subtract(uniq.one, [p[2]])[0];
	p[4] = subtract(implied.six, uniq.four)[0];
	p[1] = intersect(subtract(uniq.four, uniq.one), implied.five)[0];
	p[3] = subtract(uniq.four, implied.five)[0];
	p[6] = subtract(subtract(subtract(uniq.eight, uniq.four), uniq.seven), [
		p[4],
	])[0];
	return p;
}

console.log(partTwo(parse(b)));
