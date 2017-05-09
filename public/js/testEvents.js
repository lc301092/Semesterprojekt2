function testCalendar() {
	console.log("is testCalendar wokring?");
	var testEvent = {
		title: 'event1',
		start: '2017-05-05'
	}
	$('#calendar').fullCalendar('addEvent', testEvent);
	$('#calendar').fullCalendar('renderEvent', testEvent, true);
}