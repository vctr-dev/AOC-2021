const fs = require("fs");
const path = require("path");

function getDataFromFile(file) {
	return fs.readFileSync(path.join(path.dirname(require.main.filename), file), {
		encoding: "utf-8",
	});
}

function iterateMatrix(matrix, fn) {
	matrix.forEach((row) => row.forEach(fn));
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
};
