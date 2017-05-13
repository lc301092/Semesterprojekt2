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

//
//function addAndRenderBooking(username, date, color) {
//	console.log("is testCalendar wokring?");
//	var event = {
//		title: users[i].username,
//		start: users[i].bookings[j],
//		color: color
//	}
//	$('#calendar').fullCalendar('addEvent', event);
//	$('#calendar').fullCalendar('renderEvent', event, true);
//}

function initUnavailableDates() {
    //    console.log('initUnavailableDates');

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
            //            console.log('from server: ', data);
            for (var i = 0; i < data.length; i++) {
                //                console.log(i);
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
            //            console.log(data);
        });
    //	// blocked
    //	addAndRenderBooking('blokeret', '2017-05-13', 'black');
    //	addAndRenderBooking('blokeret', '2017-05-14', 'black');
    //	addAndRenderBooking('blokeret', '2017-05-15', 'black');
    //
    //	addAndRenderBooking('blokeret', '2017-06-13', 'black');
    //	addAndRenderBooking('blokeret', '2017-07-14', 'black');
    //	addAndRenderBooking('blokeret', '2017-07-15', 'black');
    //	// resereved 
    //	addAndRenderBooking('reserveret', '2017-05-27', 'red');
    //	addAndRenderBooking('reserveret', '2017-06-01', 'red');
    //	addAndRenderBooking('reserveret', '2017-05-17', 'red');
    //
    //	addAndRenderBooking('reserveret', '2017-07-27', 'red');
    //	addAndRenderBooking('reserveret', '2017-07-06', 'red');
    //	addAndRenderBooking('reserveret', '2017-07-17', 'red');
}
