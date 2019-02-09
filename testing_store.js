if(Store["test"] == undefined){
	Store["test"] = 0
} else {
	Store["test"] += 1
}
add_to_log("Count: "+Store["test"])
store(Store)