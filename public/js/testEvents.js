function addAndRenderBooking(username, date, color) {
	//    console.log("is testCalendar wokring?");
	var event = {
			title: username,
			start: date,
			color: color
		}
		//insert event
	$('#calendar').fullCalendar('addEvent', event);
	//render calendar
	$('#calendar').fullCalendar('renderEvent', event, true);
}


function initUnavailableDates() {


	$.ajax({
			url: '/calendarbooking',
			method: 'POST',
			data: {
				userName: 'aaa'
			}
		})
		.done(function (dataStr) {
			var data = JSON.parse(dataStr);
			var currentUser = localStorage.getItem('currentUser');
			for (var i = 0; i < data.length; i++) {
				//Skal tilføjes localuser
				if (data[i].status != currentUser && data[i].status != 'admin') {
					addAndRenderBooking(data[i].status, data[i].date,
						"#c53c37");
				} else if (data[i].status == 'admin') {
					addAndRenderBooking('Blokeret', data[i].date,
						"black");
				} else {
					addAndRenderBooking(data[i].status, data[i].date,
						"#1E90FF");
				}
			}
		});

}

function ableToBook(user, callback) {

	//find currentUsers bookings.length:
	//	ajax call 
	//	.done() tjek om arrayet er længere end 5.
	$.ajax({
			url: '/calendarbooking',
			method: 'POST',
			data: {}
		})
		.done(function (dataStr) {
			var data = JSON.parse(dataStr);
			var currentUser = user;
			var t = [];


			for (var i = 0; i < data.length; i++) {
				if (data[i].status == currentUser) {
					t.push(data[i].date);
				}

			}
			if (t.length < 5) {
				console.log('du har ' + (4 - t.length) + ' bookingtickets tilbage');
				user = true;
				console.log('return value should be: ' + user);
				callback(user);

			} else {
				console.log('du kan ikek bok mer');
				user = false;
				console.log('return value should be: ' + user);
				callback(user);
			}


		})
}