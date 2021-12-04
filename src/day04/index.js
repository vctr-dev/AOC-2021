const { getDataFromFile, rotateClockwise, iterateMatrix } = require("../utils");

const a = getDataFromFile("a");
const b = getDataFromFile("b");

const parse = (input) => {
	const c = input.split("\n\n");
	const [first, ...rest] = c;
	return {
		first: first.split(",").map((n) => ~~n),
		boards: rest.map((b) =>
			b.split("\n").map((c) => {
				const [_, ...rest] = c.match(/(..) (..) (..) (..) (..)/);
				return rest.map((n) => ({ n: ~~n, match: false }));
			})
		),
	};
};

const checkWin = (board) => {
	for (let i = 0; i < board.length; i++) {
		const r = board[i];
		if (r.every((c) => c.match)) return true;
	}
	board2 = rotateClockwise(board);
	for (let i = 0; i < board2.length; i++) {
		const r = board2[i];
		if (r.every((c) => c.match)) return true;
	}
	return false;
};
const getWinningBoard = (series, boards) => {
	for (let i = 0; i < series.length; i++) {
		const e = series[i];
		for (let j = 0; j < boards.length; j++) {
			const f = boards[j];
			f.forEach((r) =>
				r.forEach((c) => {
					if (c.n == e) c.match = true;
				})
			);
			if (checkWin(f)) return { board: f, n: e };
		}
	}
};

const partOne = (input) => {
	const { first, boards } = parse(input);
	const { board, n } = getWinningBoard(first, boards);
	let sum = 0;
	iterateMatrix(board, (e) => (e.match ? 0 : (sum += e.n)));
	return n * sum;
};

const getLastWinning = (series, boards) => {
	let k = boards;
	let lastBoard;
	for (let i = 0; i < series.length; i++) {
		const e = series[i];
		const l = [];
		for (let j = 0; j < k.length; j++) {
			const f = k[j];
			f.forEach((r) =>
				r.forEach((c) => {
					if (c.n == e) c.match = true;
				})
			);
			if (checkWin(f)) {
				if (lastBoard) {
					return { board: lastBoard, n: e };
				}
			} else {
				l.push(f);
			}
		}
		if (!lastBoard && !l[1]) lastBoard = l[0];
		k = l;
	}
};

const partTwo = (input) => {
	const { first, boards } = parse(input);
	const { board, n } = getLastWinning(first, boards);
	let sum = 0;
	iterateMatrix(board, (e) => (e.match ? 0 : (sum += e.n)));
	return n * sum;
};
console.log(JSON.stringify(partTwo(b), null, 4));
