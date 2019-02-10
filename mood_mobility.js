var MOBILITY_THRESH = 0.0001
var MOBILITY_DURATION = 3
var MOOD_QID = "5c5f860851fce255bcdbc041"
var LOC_QID = "5c5f93e445fd8c2abd23b7fa"
deactivate([{_id: LOC_QID}], Users)
activate([{_id: LOC_QID}], Users, {})

function loc_diff(loc1, loc2){
	return Math.sqrt(Math.pow(parseFloat(loc1['answerData']['latitude'])-parseFloat(loc2['answerData']['latitude']), 2)+Math.pow(parseFloat(loc1['answerData']['longitude'])-parseFloat(loc2['answerData']['longitude']), 2))
}

function get_locations_from_answers(answers){

	locations = []
	if(answers != undefined){
		for(var i = 0; i<Math.min(answers.length, MOBILITY_DURATION); i+=1){
			if(answers[i].answerData != undefined && answers[i].answerData.latitude != undefined){
				locations.push(answers[i])
			}
		}
	}
	return locations
}

function calculate_mobility_score(locations){
	if(locations != undefined && locations.length>0){
		mobility_score = 0
		var past = locations[0]
		for(var i = 1; i<locations.length; i+=1){
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


// Initialize store 
for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
	if(Store[Users[u_idx]._id] == undefined){
		Store[Users[u_idx]._id] = {"high_mobility": false}
	}
	// Each participants have periods of high and low mobility
	locations = get_locations_from_answers(Answers[Users[u_idx]._id])
	mobility_score = calculate_mobility_score(locations)
	// If user transitions from high mobility ot low mobility, activate mobility question
	if(high_mobility(mobility_score) && !Store[Users[u_idx]._id]["high_mobility"]){
		activate([{_id: MOOD_QID}], [Users[u_idx]], {})  
		send_notification("You have high mobility. What is your current mood?", Users[u_idx])
		Store[Users[u_idx]._id]["high_mobility"] = true
	}
	// If user transitions from low mobility to high mobility, activate new mobility question
	if(!high_mobility(mobility_score) && Store[Users[u_idx]._id]["high_mobility"]){
		activate([{_id: MOOD_QID}], [Users[u_idx]], {})
		send_notification("You have low mobility. What is your current mood?", Users[u_idx])
		Store[Users[u_idx]._id]["high_mobility"] = false
	}
	add_to_log("User: "+Users[u_idx].name+" Mobility Score: "+mobility_score)
}

store(Store)
