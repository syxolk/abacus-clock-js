function genClockData(date) {
	var dateString = zeroPadding2(date.getHours()) + zeroPadding2(date.getMinutes()),
		result = [];
		
	for(var i = 0; i < dateString.length; i++) {
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

function computeClockDataDiff(from, to) {
	var diff = [];
	
	for(var i = 0; i < from.length; i++) {
		diff.push(to[i] - from[i]);
	}
	
	return diff;
}

function zeroPadding2(x) {
	return ('0' + x).slice(-2);
}