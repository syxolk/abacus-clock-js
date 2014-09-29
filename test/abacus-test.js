(function(q) {

	function getTime(hours, minutes) {
		return new Date(2014, 10, 29, hours, minutes);
	}
	
	q.test('genClockData', function(assert) {
		assert.deepEqual(genClockData(getTime(0, 0)), [0, 0, 0, 0, 0, 0, 0, 0], '00:00');
		assert.deepEqual(genClockData(getTime(10, 0)), [0, 1, 0, 0, 0, 0, 0, 0], '10:00');
		assert.deepEqual(genClockData(getTime(1, 0)), [0, 0, 0, 1, 0, 0, 0, 0], '01:00');
		assert.deepEqual(genClockData(getTime(6, 0)), [0, 0, 1, 1, 0, 0, 0, 0], '06:00');
		assert.deepEqual(genClockData(getTime(0, 10)), [0, 0, 0, 0, 0, 1, 0, 0], '00:10');
		assert.deepEqual(genClockData(getTime(0, 50)), [0, 0, 0, 0, 1, 0, 0, 0], '00:50');
		assert.deepEqual(genClockData(getTime(0, 1)), [0, 0, 0, 0, 0, 0, 0, 1], '00:01');
		assert.deepEqual(genClockData(getTime(0, 5)), [0, 0, 0, 0, 0, 0, 1, 0], '00:05');
		assert.deepEqual(genClockData(getTime(23, 59)), [0, 2, 0, 3, 1, 0, 1, 4], '23:59');
		assert.deepEqual(genClockData(getTime(12, 27)), [0, 1, 0, 2, 0, 2, 1, 2], '12:27');
	});
	
	q.test('computeClockDataDiff', function(assert) {
		assert.deepEqual(computeClockDataDiff([0, 1, 0, 2, 0, 2, 1, 2], [0, 1, 0, 2, 0, 2, 1, 3]), [0, 0, 0, 0, 0, 0, 0, 1], '12:27 - 12:28');
		assert.deepEqual(computeClockDataDiff([0, 1, 0, 2, 0, 2, 1, 4], [0, 1, 0, 2, 0, 3, 0, 0]), [0, 0, 0, 0, 0, 1, -1, -4], '12:29 - 12:30');
		assert.deepEqual(computeClockDataDiff([0, 1, 0, 2, 0, 2, 1, 4], [0, 2, 0, 3, 1, 0, 1, 4]), [0, 1, 0, 1, 1, -2, 0, 0], '12:29 - 23:59');
	});
	
	q.test('zeroPadding2', function(assert) {
		assert.strictEqual(zeroPadding2(0), '00', '0 -> 00');
		assert.strictEqual(zeroPadding2(1), '01', '1 -> 01');
		assert.strictEqual(zeroPadding2(10), '10', '10 -> 10');
	});

})(QUnit);