/*
 * Generate an array out of the date containing a visual representation
 * of the abacus clock. The array returned contains exactly 8 integers.
 * Each integer is the number of spheres at the border line (between the
 * the five' and the one' parts). This spheres are 'activated', meaning that
 * they are needed to read the time from the clock. The elements of the array
 * have the following meaning:
 * 
 * [5-ball for tens digit of hour, 1-ball for tens digit of hour,
 * 5-ball for ones digit of hour, 1-ball for ones digit of hour,
 * 5-ball for tens digit of minute, 1-ball for tens digit of minute,
 * 5-ball for ones digit of minute, 1-ball for ones digit of minute]
 */
function genClockData(date) {
	var dateString = zeroPadding2(date.getHours()) + zeroPadding2(date.getMinutes()),
		result = [];
		
	for(var i = 0; i < 4; i++) {
		var digit = dateString[i] * 1;
		
		if(digit >= 5) {
			result.push(1);
			digit -= 5;
		} else {
			result.push(0);
		}
		
		result.push(digit);
	}
	
	return result;
}

/*
 * Computes the difference between two results of genClockData.
 *
 * For each element of the parameter arrays to[i] - from[i] is
 * computed and the result is returned.
 */
function computeClockDataDiff(from, to) {
	var diff = [];
	
	for(var i = 0; i < from.length; i++) {
		diff.push(to[i] - from[i]);
	}
	
	return diff;
}

/*
 * Pads an integer to two digits by prepending a zero
 * if necessary. Returns a string.
 */
function zeroPadding2(x) {
	return ('0' + x).slice(-2);
}