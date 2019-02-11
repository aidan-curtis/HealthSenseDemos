const MC = Questions[0]
const LOC = Questions[1]
const FD = Questions[2]

const WAIT_DURATION = 15
const MAX_QUESTION = 5

function get_location_from_answers(answers){
	locations = []
	if(answers != undefined){
		for(var i = 0; i<answers.length; i+=1){
			if(answers[i].answerData != undefined && answers[i].answerData.latitude != undefined){
				return answers[i]
			}
		}
	}
	return undefined
}

function get_name_from_venues(venues){
	return venues.map(function(venue){return venue.name}).join()
}

for(var u_idx = 0; u_idx<Users.length; u_idx+=1){

	var date = new Date()
	var hour = date.toLocaleString('en-US', {hour: '2-digit',  hour12: false, timeZone: 'America/Chicago' })
	var minute = date.toLocaleString('en-US', {minute: '2-digit',  timeZone: 'America/Chicago' })
	var User = Users[u_idx]

	if(hour == 9 && minute == 0){
		send_notification("Make sure you add your breakfast to the food diary", User)
	}
	if(hour == 12 && minute == 0){
		send_notification("Make sure you add your lunch to the food diary", User)
	}
	if(hour == 18 && minute == 0){
		send_notification("Make sure you add your dinner to the food diary", User)
	}

	var new_store = {}
	if(Store != undefined){
		new_store = Store
	}

	if(new_store[User._id] == null){
		new_store[User._id] = {}
		activate([FD], User, {})
		activate([LOC], User, {})
	}

	if(Answers[User._id] != null){
		var location = get_location_from_answers(Answers[User._id])
		if(location != undefined) {
			var check_store = location.answerData 
			var loc = {
				"lat": parseFloat(check_store['latitude']), 
				"long": parseFloat(check_store['longitude'])
			}
			var params = {
				radius: "50", //meters
				categoryIds: ["4d4b7105d754a06374d81259"]
			}
			Foursquare.Venues.searchLocation(loc, params, "", (function(){
				var cUser = User;
				return function(err, response){
					if (err) {
						add_to_log(JSON.stringify(error))
						throw err;
					}
					if(response.venues.length>0) {
						venue_name = get_name_from_venues(response.venues)
						if(new_store[cUser._id][venue_name] == undefined){
							new_store[cUser._id][venue_name] = 1
						} else {
							new_store[cUser._id][venue_name] += 1
							if(new_store[cUser._id][venue_name] == WAIT_DURATION){
								restaurants = {}
								for(var i = 0; i<Math.min(response.venues.length, MAX_QUESTION); i+=1){
									restaurants["restaurant"+(i+1)] = response.venues[i].name
								}
								add_to_log(JSON.stringify(restaurants))
								send_notification("Did you eat at one of these restaurants", cUser)
								activate([MC], [cUser], restaurants)
							}
						}
						add_to_log(JSON.stringify(new_store))
					} 
					store(new_store)
				}
			})());
		} else {
			store(new_store)
		}
	} else {
		store(new_store)
	}
}
