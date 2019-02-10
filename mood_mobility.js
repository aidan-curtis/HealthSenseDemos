var MOBILITY_THRESH = 5
var MOBILITY_DURATION = 10
var MOOD_QID = "5c5f860851fce255bcdbc041"

function loc_diff(loc1, loc2){
	return Math.sqrt(Math.pow(parseFloat(loc1['latitude'])-parseFloat(loc1['latitude']), 2)+Math.pow(parseFloat(loc1['longitude'])-parseFloat(loc1['longitude']), 2))
}

function get_locations_from_answers(answers){
	for(var i = 0; i<answers.length; i+=1){

	}
}

function calculate_mobility_score(locations){
	if(locations.length>0){
		mobility_score = 0
		var past = locations[0]
		for(var i = 1; i<Math.min(locations.length, MOBILITY_DURATION); i+=1){
			mobility_score += loc_diff(past, locations[i])
			past = locations[i]
		}
		return mobility_score
	} else {
		return 0
	}
}

function high_mobility(mobility_score){
	return mobility_score>MOBILITY_THRESH
}

if(Store == {}){
	// Initialize store 
	for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
		Store[Users[u_idx]._id] = {"high_mobility": false}
	}
} else {
	// Initialize store 
	for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
		// Each participants have periods of high and low mobility
		locations = get_locations_from_answers(Answers[uid])
		mobility_score = calculate_mobility_score(locations)
		// If user transitions from high mobility ot low mobility, activate mobility question
		if(high_mobility(mobility_score) && !Store[Users[u_idx]._id]["high_mobility"]){
			activate([{_id: MOOD_QID}]], [Users[u_idx]], {})  
		}
		// If user transitions from low mobility to high mobility, activate new mobility question
		if(!high_mobility(mobility_score) && Store[Users[u_idx]._id]["high_mobility"]){
			activate([{_id: MOOD_QID}]], [Users[u_idx]], {})
		}
		add_to_log("User: "+Users[u_idx].name+" Mobility Score: "+mobility_score)
	}
}