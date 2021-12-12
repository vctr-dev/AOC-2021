const { getDataFromFile } = require("../utils");

const a = getDataFromFile("a");
const b = getDataFromFile("b");

const scoringIllegalChar = {
	")": 3,
	"]": 57,
	"}": 1197,
	">": 25137,
};
const scoringCompletion = {
	")": 1,
	"]": 2,
	"}": 3,
	">": 4,
};

const pairing = {
	"(": ")",
	"[": "]",
	"{": "}",
	"<": ">",
};

function parse(params) {
	return params.split("\n").map((v) => v.split(""));
}

function getProblem(param) {
	const stack = [];
	for (let i = 0; i < param.length; i++) {
		const v = param[i];
		if (pairing[v]) {
			stack.push(v);
			continue;
		}
		if (v !== pairing[stack.pop()]) return { illegalChar: v };
	}
	return {
		completion: stack.reverse().map((v) => pairing[v]),
	};
}

function partOne(params) {
	return params
		.map((v) => getProblem(v))
		.filter((v) => v?.illegalChar != undefined)
		.map((v) => scoringIllegalChar[v.illegalChar])
		.reduce((a, v) => a + v, 0);
}

function partTwo(params) {
	const scores = params
		.map((v) => getProblem(v))
		.filter((v) => v?.completion?.length > 0)
		.map(({ completion }) => completion.map((n) => scoringCompletion[n]))
		.map((v) => v.reduce((a, v) => a * 5 + v, 0))
		.sort((a, b) => a - b);
	return scores[Math.floor(scores.length / 2)];
}

console.log(partTwo(parse(b)));
