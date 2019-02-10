if(Store == {} || Store["groups"] == undefined){
	Store = {}
	Store["groups"] = {"A": [], "B": []}
	// Assign groups
	for(var u_idx = 0; u_idx<Users.length; u_idx+=1) {
		send_notification("Testing Automated Notification", Users[u_idx])
		if(Math.floor(Math.random()*2)==0){
			add_to_log("User " + Users[u_idx].name+" has been added to group A")
			Store["groups"]["A"].push(Users[u_idx])
		} else {
			add_to_log("User " + Users[u_idx].name+" has been added to group B")
			Store["groups"]["B"].push(Users[u_idx])
		}
	}
	store(Store)
} else {
	// Groups have been randomized and we can start the intervention on group A
	for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
		//Check within lunch minute
		var currentTime = (new Date());
		if(currentTime.getHours() == 12 && currentTime.getMinutes() == 0){
			send_notification("Make sure you eat a healthy lunch", Store["groups"]["A"][u_idx])
		}
	}
	add_to_log("Notifications Sent")
}