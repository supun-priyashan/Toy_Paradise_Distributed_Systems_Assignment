const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");

//Payment Dummy POSTs
router.post("/cardPayment",auth, (req, res) => {

    return res.json({ success: true});

});

router.post("/mobilePayment",auth, (req, res) => {

    return res.json({ success: true});

});

module.exports = router;
