for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
	send_notification("Testing Automated Notification", Users[u_idx])
	add_to_log("Sending notification to " + Users[u_idx].name)
}
