var HR_QID = "5c5f98c645fd8c2abd23b838"
var WHY_HR_QID = "5c5f9ee745fd8c2abd23b84f"
// Number of minutes to wait before asking about high heart rate again
var DELAY = 30
deactivate([{_id: HR_QID}], Users)
activate([{_id: HR_QID}], Users, {})

function get_hrs_from_answers(answers){
	locations = []
	if(answers != undefined){
		for(var i = 0; i<answers.length; i+=1){
			if(answers[i].answerData != undefined && answers[i].answerData.hr != undefined){
				locations.push(parseFloat(answers[i].answerData.hr))
			}
		}
	}
	return locations
}


function average(hrs){
	var sum = hrs.reduce(function(sum, value){
		return sum + value;
	}, 0);
	return sum / hrs.length
}

function std(hrs, mean){
	var squareDiffs = hrs.map(function(value){
		var diff = value - mean;
		var sqr = diff * diff;
		return sqr;
	});
	var avgSquareDiff = average(squareDiffs);
	return Math.sqrt(avgSquareDiff);
}

function high_hr(hr, mean, std){
	return hr>mean+2*std
}

// Initialize store 
for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
	if(Store[Users[u_idx]._id] == undefined){
		Store[Users[u_idx]._id] = 0
	}
	// Each participants have periods of high and low mobility
	hrs = get_hrs_from_answers(Answers[Users[u_idx]._id])
	mean = average(hrs)
	hr_std = std(hrs, mean)
	add_to_log(JSON.stringify(hrs))
	add_to_log("mean: "+mean)
	add_to_log("std: "+hr_std)
	hr = hrs[0] // first heart rate
	if(high_hr(hr, mean, hr_std) && Store[Users[u_idx]._id] <= 0){
		activate([{_id: WHY_HR_QID}], [Users[u_idx]], {}) 
		Store[Users[u_idx]._id] = DELAY 
	}
	Store[Users[u_idx]._id]-=1
}
store(Store)