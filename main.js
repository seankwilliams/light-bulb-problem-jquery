//only run jquery selectors once as the selector process invovles additional processing time
var $lightBulbs = $("input[name=light-bulbs]");
var $people = $("input[name=people]");
var $resultsValues = $(".results__values");
var $totalLightBulbsOn = $("#total-light-bulbs-on");
var $specificLightBulbsOn = $("#specific-light-bulbs-on");

$(function() {
	//hide results when changing values
	$lightBulbs.add($people).change(function(){
		$resultsValues.hide();
	});
	
	//process user input
	$("form").submit(function(e) {
		e.preventDefault();
		
		var lightBulbs = Number($lightBulbs.val());
		var people = Number($people.val());
		var startTime = performance.now();
		
		//validate
		$("input.error").removeClass("error");
		var error = false;
		if (lightBulbs.length == 0 || !Number.isInteger(lightBulbs) || lightBulbs < 1) {
			$lightBulbs.addClass("error");
			error = true;
		}
		if (people.length == 0 || !Number.isInteger(people) || people < 1) {
			$people.addClass("error");
			error = true;
		}
		if (error) return;
		
		//determine which light bulbs are on
		var lightBulbsArray = [];
		var currentPerson, j, index;
		for (currentPerson = 1; currentPerson <= people; currentPerson++) {
			for (j = currentPerson; j <= lightBulbs; j += currentPerson) {
				if (!lightBulbsArray[j]) {
					//lightbulb is off, switch it on
					lightBulbsArray[j] = true;
				} else {
					//lightbulb is on, switch it off
					lightBulbsArray[j] = false;
				}
			}
		}
		
		var lightBulbsOn = [];
		for (var i = 0; i < lightBulbsArray.length; i++) {
			if (lightBulbsArray[i]) {
				lightBulbsOn.push(i);
			}
		}
		
		//output results
		$totalLightBulbsOn.html(lightBulbsOn.length);
		$specificLightBulbsOn.html(lightBulbsOn.join(', '));
		$resultsValues.show();
		
		//write the execution time to console
		var endTime = performance.now();
		console.log("Calculating " + lightBulbs + " light bulbs and " + people +
					" people took " + (endTime - startTime) + " milliseconds.");
	});
});

//polyfill for isInteger from MDN
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === 'number' && 
		isFinite(value) && 
		Math.floor(value) === value;
};