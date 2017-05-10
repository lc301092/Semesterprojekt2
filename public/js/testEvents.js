function addAndRenderBooking(username, date) {
	console.log("is testCalendar wokring?");
	var event = {
		title: username,
		start: date
	}
	$('#calendar').fullCalendar('addEvent', event);
	$('#calendar').fullCalendar('renderEvent', event, true);
}