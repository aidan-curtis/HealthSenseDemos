if(Store['active_question'] != undefined){
	deactivate([Store['active_question']], Users)  // Deactivate the current question
}
var question_index = Math.floor(Math.random()*Questions.length) // Choose a random question index
activate([Questions[question_index]], Users, {})  // Activate 
Store['active_question'] = Questions[question_index] // Store the last asked question
for(var u_idx = 0; u_idx<Users.length; u_idx+=1){
	send_notification(Questions[question_index].question, Users[u_idx])
}
store(Store)