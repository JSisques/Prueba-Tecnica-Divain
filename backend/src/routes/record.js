const express = require("express");
const recordController = require("../controllers/record");

const router = express.Router();

router.get("/record", recordController.getModels);

module.exports = router;
