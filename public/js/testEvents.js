function addAndRenderBooking(username, date, color) {
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
			currentUserBookingCounter = 0;
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
					currentUserBookingCounter += 1;
				}
			}
			$('#bookingCounter').text(currentUserBookingCounter);
			$('#bookingRemaining').text(5 - currentUserBookingCounter);
			$('#abe').text(6 - currentUserBookingCounter);
		});
}

function ableToBook(user, callback) {
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

				user = true;

				callback(user);

			} else {
				user = false;
				callback(user);
			}
		})
}
// booking modal
var modalBooking = {
	data: null,
	openModalPanel: function (data) {
		this.data = data;

		window.parent.postMessage({
			message: 'makeModal'
		}, 'http://localhost:3000/main');

		var $modal = $('#bookModal');
		var modalDate = new Date(data.start._d);
		var modalNextDay = new Date(modalDate);
		modalNextDay.setDate(modalDate.getDate() + 1);
		$("#modalDate").text('fra d. ' + modalDate.toISOString().slice(0, 10) + ' til og med d. ' + modalNextDay.toISOString().slice(0, 10));

		$modal.css('display', 'block');

		// register event handlers for the 2 buttons, to perfrom registration + ajax
	},
	close: function () {
		$('#bookModal').css('display', 'none');
		window.parent.postMessage({
			message: 'closeModal'
		}, 'http://localhost:3000/main');
	},
	submit: function () {
		$.ajax({
			url: '/calendarbookingpost',
			method: 'POST',
			data: {
				date: this.data.start.format(),
				currentUser: localStorage.getItem('currentUser'),
			}
		})
		$('#calendar').fullCalendar('renderEvent', this.data, true);
		$('#calendar').fullCalendar('unselect');

		currentUserBookingCounter++;
		$('#bookingCounter').text(currentUserBookingCounter);
		$('#bookingRemaining').text(5 - currentUserBookingCounter);
		$('#abe').text(6 - currentUserBookingCounter);

		this.close();
	}
};
// her delete modal
var modalDelete = {
	data: null,
	openModalPanel: function (data, user, index) {
		this.data = data;
		this.user = user;
		this.index = index;
		window.parent.postMessage({
			message: 'makeModal'
		}, 'http://localhost:3000/main');

		var $modal = $('#deleteModal');
		var modalDate = new Date(data.start._d);
		var modalNextDay = new Date(modalDate);
		modalNextDay.setDate(modalDate.getDate() + 1);

		modalNextDay.setDate(modalDate.getDate() + 1);

		$("#modalDeleteDate").text('fra d. ' + modalDate.toISOString().slice(0, 10) + ' til og med d. ' + modalNextDay.toISOString().slice(0, 10));

		$modal.css('display', 'block');

		//				register event handlers for the 2 buttons, to perfrom registration + ajax
	},

	close: function () {
		$('#deleteModal').css('display', 'none');
		window.parent.postMessage({
			message: 'closeModal'
		}, 'http://localhost:3000/main');
	},

	delete: function () {
		var deletedDate = this.data.start._d.toISOString().slice(0, 10);
		$.ajax({
			url: '/calendarbookingdelete',
			method: 'DELETE',
			data: {
				currentUser: localStorage.getItem('currentUser'),
				checkUser: this.user,
				index: this.index,
				date: deletedDate
			}
		})

		var checkUser = this.user;
		if (currentUser == checkUser) {
			$('#calendar').fullCalendar('removeEvents', this.data._id);
		} else if (currentUser == 'admin') {
			$('#calendar').fullCalendar('removeEvents', this.data._id);
		}
		currentUserBookingCounter--;
		$('#bookingCounter').text(currentUserBookingCounter);
		$('#bookingRemaining').text(5 - currentUserBookingCounter);
		$('#abe').text(6 - currentUserBookingCounter);
		this.close();
	}
};