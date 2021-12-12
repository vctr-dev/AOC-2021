const { rulesToMonitor } = require("nodemon/lib/monitor/match");
const { getDataFromFile } = require("../utils");

const a = getDataFromFile("a");
const b = getDataFromFile("b");

function isUpperCase(params) {
	return /^[A-Z]+$/.test(params);
}
function isLowerCase(params) {
	return /^[a-z]+$/.test(params);
}

function parse(params) {
	return params.split("\n").map((v) => {
		const [start, end] = v.split("-");
		return { start, end };
	});
}

function partOne(params) {
	const explorePaths = [["start"]];
	const endPaths = [];
	while (explorePaths.length) {
		const cur = explorePaths.pop();
		const nextNode = cur[cur.length - 1];
		[
			...new Set(
				params
					.filter((v) => v.start === nextNode || v.end === nextNode)
					.map((v) => (v.start === nextNode ? v.end : v.start))
			),
		].forEach((v) => {
			if (v === "end") {
				endPaths.push([...cur, v]);
				return;
			}
			if (cur.includes(v) && isLowerCase(v)) {
				return;
			}
			explorePaths.push([...cur, v]);
		});
	}
	return endPaths.length;
}

function hasVisitedSmallCaveTwice(path) {
	const smallCaves = path.filter((v) => isLowerCase(v) && v !== "start");
	return smallCaves.length !== new Set(smallCaves).size;
}
function partTwo(params) {
	const explorePaths = [["start"]];
	const endPaths = [];
	while (explorePaths.length) {
		const cur = explorePaths.pop();
		const nextNode = cur[cur.length - 1];
		[
			...new Set(
				params
					.filter((v) => v.start === nextNode || v.end === nextNode)
					.map((v) => (v.start === nextNode ? v.end : v.start))
			),
		].forEach((v) => {
			if (v === "end") {
				endPaths.push([...cur, v]);
				return;
			}
			if (v === "start") {
				return;
			}
			if (isLowerCase(v) && cur.includes(v) && hasVisitedSmallCaveTwice(cur)) {
				return;
			}
			explorePaths.push([...cur, v]);
		});
	}
	return endPaths.map((v) => v.join(",")).sort().length;
}

console.log(partTwo(parse(b)));
