var LOC_QID = "5c26a2d5aa840d2aff351434"
deactivate([{_id: LOC_QID}], Users)
activate([{_id: LOC_QID}], Users, {})
for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
	var User = Users[u_idx]
	var uid = Users[u_idx]._id
	var Question = Questions[1]
	var new_store = {}
	if(Store != undefined){
		new_store = Store
	}
	if(Answers[uid] != null){
		if(new_store[uid] == null){
			new_store[uid] = {}
		}
		check_store = Answers[uid][0].answerData 
		parameters = {
			location: [parseFloat(check_store['latitude']), parseFloat(check_store['longitude'])],
			rankby: "distance",
			type: "food"
		}
		google_places.placeSearch(parameters, function (error, response) {
			if (error) {
				add_to_log(JSON.stringify(error))
				throw error;
			}
			if(response.results.length>0) {
				if (response.results[0].types.includes("food")) {
					// module.exports = response.result
					lat1 = response.results[0].geometry.location['lat']
					lng1 = response.results[0].geometry.location['lng']
					lat2 = parseFloat(check_store['latitude'])
					lng2 = parseFloat(check_store['longitude'])
					var lat_dist_sq = Math.abs(lat1-lat2)**2
					var lng_dist_sq = Math.abs(lng1-lng2)**2
					var radius = Math.sqrt(lat_dist_sq+lng_dist_sq)

					if(new_store[uid][response.results[0].name] == undefined){
						new_store[uid][response.results[0].name] = 1
					} else if(radius<=0.0002){
						new_store[uid][response.results[0].name] += 1
						if(new_store[uid][response.results[0].name] == 15){
							send_notification("Did you eat at "+response.results[0].name+" ?", User)
							activate([Question], [User], {restaurant: response.results[0].name})
						}
					}
					store(new_store)
					add_to_log(JSON.stringify(new_store))
				}
			} 
			
		});
	}
}
