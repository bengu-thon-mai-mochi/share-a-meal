const express = require("express");
const router = express.Router();
const pool = require("./../database");

router.post("/", (req, res) => {
    const {
        'meal_id': id,
        'name': fullname,
        'email': email,
        'phonenumber': phonenumber
    } = req.body;
  
    const data = {
        'meal_id': id,
        'name': fullname,
        'email': email,
        'phonenumber': phonenumber
    }
  
    pool.query('INSERT INTO reservation SET ?', data, function(err, results, field) {
      if (err) {
        res.send(err)
      } else {
        return res.json({createdId: results.insertId})
      };
    });
})

module.exports = router;
