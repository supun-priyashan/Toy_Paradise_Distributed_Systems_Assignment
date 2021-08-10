const express = require('express');
const {Delivery} = require("../models/Delivery");
const router = express.Router();

const { auth } = require("../middleware/auth");

//Delivery Dummy POST
router.post("/addDelivery",auth, (req, res) => {

    const delivery = new Delivery(req.body);

    delivery.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

module.exports = router;
