Raphael(function() {
	// 70 + 140 + 140 + 140 + 140 + 70
	var paper = ScaleRaphael('canvas', 700, 700);
	
	// SCALE RAPHAEL BEGIN
	var windowAddEvent = window.attachEvent || window.addEventListener;
      
	function resizePaper(){
	   var w = 0, h = 0;
	   if (window.innerWidth){
		  w = window.innerWidth;
		  h = window.innerHeight;
	   }else if(document.documentElement &&
			   (document.documentElement.clientWidth || 
				document.documentElement.clientHeight)) { 
				w = document.documentElement.clientWidth;
				h = document.documentElement.clientHeight;
	   }
	   paper.changeSize(w, h, true, false);
	}
	resizePaper();
	$(window).resize(resizePaper);
	//windowAddEvent("resize", resizePaper, false);
	// SCALE RAPHAEL END
	
	// generate background
	var railLines = paper.path('M 140 0 L 140 700 M 280 0 L 280 700 M 420 0 L 420 700 M 560 0 L 560 700').attr({
		'stroke' : '#939393',
		'stroke-width' : '10px'
	});
	var boundingRect = paper.rect(5, 5, 690, 690).attr({
		'stroke' : '#EF9534',
		'stroke-width' : '10px'
	});
	var borderLine = paper.path('M 5 200 L 695 200').attr({
		'stroke' : '#EF9534',
		'stroke-width' : '20px'
	});
	
	// generate clock stones
	function genStone(x, y, otherY) {
		return paper.circle(x, y, 40)
			.attr('fill', '#eee').attr('stroke', '#000')//.attr('stroke-width', '1px')
			.data('y0', y).data('y1', otherY);
	}
	
	var stones = [];
	
	for(var i = 0; i < 8; i++) {
		if(i % 2 === 0) { // five
			stones.push([
				genStone(140 + i * 70, 50, 150)
			]);
		} else { // one
			var x = 140 + (i - 1) * 70;
			
			stones.push([
				genStone(x, 350, 250),
				genStone(x, 450, 350),
				genStone(x, 550, 450),
				genStone(x, 650, 550)
			]);
		}
	}
	
	// current state of the clock
	var clockData = [0, 0, 0, 0, 0, 0, 0, 0];
	
	// function to update the UI in case of time change
	function updateClock(date) {
		var newClockData = genClockData(date);
		var diff = computeClockDataDiff(clockData, newClockData);
		
		for(var i = 0; i < 8; i++) {
			var d = diff[i], curr = clockData[i], st = stones[i];
			
			if(d !== 0) { // is here a positive change (stones going to the border line)
				var from = d > 0 ? curr : curr + d;
				var to = d > 0 ? curr + d : curr;
				var dest = d > 0 ? 'y1' : 'y0';
				
				for(var j = from; j < to; j ++) {
					st[j].animate({
						cy : st[j].data(dest)
					}, 500, '<>', function() {
						console.log('moved');
					});
				}
			}
		}
		
		clockData = newClockData;
	}
	
	updateClock(new Date());
	
	setInterval(function() {
		updateClock(new Date());
	}, 1000);
});