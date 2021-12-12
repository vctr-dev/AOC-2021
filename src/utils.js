const fs = require("fs");
const path = require("path");

function getDataFromFile(file) {
	return fs.readFileSync(path.join(path.dirname(require.main.filename), file), {
		encoding: "utf-8",
	});
}

function iterateMatrix(matrix, fn) {
	matrix.forEach((row, y) => row.forEach((val, x) => fn(val, x, y)));
}
function getPoint(matrix, x, y) {
	return matrix[y]?.[x];
}

function getAround(matrix, point, includeDiagonals = false) {
	const left = point.x - 1;
	const right = point.x + 1;
	const up = point.y - 1;
	const down = point.y + 1;
	return [
		{ point: { x: left, y: point.y }, val: getPoint(matrix, left, point.y) },
		{ point: { x: right, y: point.y }, val: getPoint(matrix, right, point.y) },
		{ point: { x: point.x, y: up }, val: getPoint(matrix, point.x, up) },
		{ point: { x: point.x, y: down }, val: getPoint(matrix, point.x, down) },
		...(includeDiagonals
			? [
					{ point: { x: left, y: up }, val: getPoint(matrix, left, up) },
					{ point: { x: left, y: down }, val: getPoint(matrix, left, down) },
					{ point: { x: right, y: up }, val: getPoint(matrix, right, up) },
					{ point: { x: right, y: down }, val: getPoint(matrix, right, down) },
			  ]
			: []),
	].filter(({ val }) => val !== undefined);
}

// from https://stackoverflow.com/a/48377330
function rotateCounterClockwise(a) {
	var n = a.length;
	for (var i = 0; i < n / 2; i++) {
		for (var j = i; j < n - i - 1; j++) {
			var tmp = a[i][j];
			a[i][j] = a[j][n - i - 1];
			a[j][n - i - 1] = a[n - i - 1][n - j - 1];
			a[n - i - 1][n - j - 1] = a[n - j - 1][i];
			a[n - j - 1][i] = tmp;
		}
	}
	return a;
}

function rotateClockwise(a) {
	var n = a.length;
	for (var i = 0; i < n / 2; i++) {
		for (var j = i; j < n - i - 1; j++) {
			var tmp = a[i][j];
			a[i][j] = a[n - j - 1][i];
			a[n - j - 1][i] = a[n - i - 1][n - j - 1];
			a[n - i - 1][n - j - 1] = a[j][n - i - 1];
			a[j][n - i - 1] = tmp;
		}
	}
	return a;
}

module.exports = {
	getDataFromFile,
	rotateClockwise,
	rotateCounterClockwise,
	iterateMatrix,
	getAround,
};
