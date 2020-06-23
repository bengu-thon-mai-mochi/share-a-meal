const express = require('express');
const router = express.Router();
const pool = require('./../database');

router.get('/', (req, res) => {
	const { title } = req.query;

	if (title) {
		pool.query(`SELECT * FROM meal WHERE title LIKE ?`, [`%${title}%`], function(err, result, field) {
			if (err) {
				return res.send(err);
			} else {
				return res.json(result);
			}
		});
	} else {
		pool.query('SELECT * FROM MEAL', function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		});
	}
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	pool.query(`SELECT * FROM meal WHERE Id=?`, [`${id}`], function(err, result) {
		if (err) {
			res.send(err);
		} else { 
			res.json(result);
		}
	});
});

router.post('/', (req, res) => {
	const { title, description, location, reservation_time, max_reservation, price, created_date } = req.body;

	const data = {
		Title: title,
		Description: description,
		Location: location,
		Reservation_time: reservation_time,
		Max_reservations: max_reservation,
		Price: price,
		Created_Date: created_date
	};

	pool.query('INSERT INTO meal SET ?', data, function(err, result, field) {
		if (err) {
			return res.send(err);
		} else {
			return res.send({ createdId: result.insertId });
		}
	});
});

module.exports = router;
