var express = require('express');
var router = express.Router();






/* main page. */
router.route('/main')
	/* GET route for main page. */
	.get(function (req, res) {
		// Require our DB variable
		var db = req.db;
		// Get the newscollection and make it accesible in main through ejs
		db.get('newscollection').find({}).then((data) => {
			//Load main page
			res.render('main', {
				"newslist": data[0].news,
				title: 'mainpage'
			});
		});
	})
	/* POST route for main page. */
	.post(function (req, res) {
		// Require our DB variable
		var db = req.db;
		//Define title, date and paragraph from inputs on main page
		var title = req.body.newTitle;
		var dato = req.body.newDato;
		var paragraph = req.body.newParagraph;

		// Push data to newscollection
		db.get('newscollection').update({}, {
				"$push": {
					"news": {
						"title": title,
						"paragraph": paragraph,
						"dato": dato,
					}
				}
			},
			function (err, doc) {
				if (err) {
					// If it failed, return error
					res.send("There was a problem adding the information to the database.");
				} else {
					// And forward to success page
					res.redirect("/main");
				}
			});
	})
	/* DELETE route for main page. */
	.delete(function (req, res, next) {

		var index = req.body.index;

		// Require our DB variable
		var db = req.db;

		db.get('newscollection').find({}).then((data) => {

			var i = data[0].news.length - index - 1;

			data[0].news.splice(i, 1);



			// delete data to newscollection
			db.get('newscollection').update({}, {
					"$set": {
						"news": data[0].news
					}
				},
				function (err, doc) {
					if (err) {
						// If it failed, return error
						res.send("There was a problem deleting the object in the database.");
					} else {
						// And respond with complete
						res.send("Collection updated");
					}
				});
		});
	});


//route to edit news in newsbox
router.route('/editnews')
	/* POST route for main page. */
	.post(function (req, res) {
		//Define title, date and paragraph from inputs on main page
		var index = req.body.index;
		var title = req.body.title;
		var paragraph = req.body.paragraph;
		// Request our DB variable
		var db = req.db;
		db.get('newscollection').find({}).then((data) => {
			var i = data[0].news.length - index - 1;


			data[0].news[i].title = title;
			data[0].news[i].paragraph = paragraph;


			db.get('newscollection').update({}, {
					$set: {
						"news": data[0].news
					}
				}),
				function (err, doc) {
					if (err) {
						// If it failed, return error
						res.send("There was a problem adding the information to the database.");
					} else {
						// And forward to success page
						res.send("editNews complete");
					}
				}
		});
	});

//route to INIT/GET bookings in calendar 
router.route('/calendarbooking')
	//GET route for calendar
	.post(function (req, res) {
		// getcollectionfind iterate over users etc
		var db = req.db;
		db.get('usercollection').find({}).then((data) => {
			var t = [];
			for (var i = 0; i < data.length; i++) {
				var user = data[i].username;
				for (var j = 0; j < data[i].bookings.length; j++) {
					var date = data[i].bookings[j];
					var bookingDate = new Date(date);
					var now = new Date();
					if (bookingDate.toISOString().substring(0, 10) >= now.toISOString().substring(0, 10)) {
						t.push({
							status: user,
							date: date
						});
					} else {}

				}
			}
			res.send(JSON.stringify(t));
		});
	});
// route to bookings in calendar POST
router.route('/calendarbookingpost')
	/* POST route for main page. */
	.post(function (req, res) {
		var date = req.body.date;
		var currentUser = req.body.currentUser;
		var t = [];
		// Request our DB variable
		var db = req.db;
		db.get('usercollection').find({}).then((data) => {
			for (var i = 0; i < data.length; i++) {

				for (var j = 0; j < data[i].bookings.length; j++) {
					var booking = data[i].bookings[j];
					t.push(booking);
				}
			}
			if (t.includes(date) == false) {
				db.get('usercollection').update({

					username: {
						$in: [currentUser]
					}
				}, {
					$push: {
						"bookings": date
					}
				});
			}
		});
		res.send('done');
	});

router.route('/calendarbookingdelete')
	/* DELETE route for main page. */
	.delete(function (req, res) {
		var date = req.body.date;
		var currentUser = req.body.currentUser;
		var index = req.body.index;
		var checkUser = req.body.checkUser;
		// Request our DB variable
		if (index && currentUser == 'admin' && checkUser != 'Blokeret' && checkUser != 'admin') {
			var db = req.db;
			db.get('usercollection').update({
				username: {
					$in: [checkUser]
				}
			}, {
				//scope er med users ikke med bookings. DET SKAL FIKSES 
				$pull: {
					"bookings": date
				}
			});

		} else if (index && checkUser == currentUser || currentUser == "admin") {
			var db = req.db;
			db.get('usercollection').update({
				username: {
					$in: [currentUser]
				}
			}, {
				//scope er med users ikke med bookings. DET SKAL FIKSES 
				$pull: {
					"bookings": date
				}
			});
		}
		res.send('done');
	});
/* Login page. */
router.route('/')
	/* GET route for login page. */
	.get(function (req, res) {
		//Load login page
		res.render('login', {
			title: 'login'
		});
	});

router.route('/signin')
	.post(function (req, res) {
		var x = req.body.User;
		var y = req.body.Password;

		// getcollectionfind iterate over users etc
		var db = req.db;
		db.get('usercollection').findOne({
			username: x
		}).then((data) => {
			console.log(data);

			if (x == data.username && y == data.userPassword) {
				console.log("match");
				res.cookie('currentUser', data.username);
				res.redirect('main');

			} else {
				res.redirect('/');
			}

		});
	});

module.exports = router;
