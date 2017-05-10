function addAndRenderBooking(username, date, color) {
	console.log("is testCalendar wokring?");
	var event = {
		title: username,
		start: date,
		color: color
	}
	$('#calendar').fullCalendar('addEvent', event);
	$('#calendar').fullCalendar('renderEvent', event, true);
}

function initUnavailableDates() {
	// blocked
	addAndRenderBooking('blokeret', '2017-05-13', 'black');
	addAndRenderBooking('blokeret', '2017-05-14', 'black');
	addAndRenderBooking('blokeret', '2017-05-15', 'black');
	// resereved 
	addAndRenderBooking('reserveret', '2017-05-27', 'red');
	addAndRenderBooking('reserveret', '2017-05-06', 'red');
	addAndRenderBooking('reserveret', '2017-05-17', 'red');
}