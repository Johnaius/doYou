const express = require("express")
const router = express.Router()
const checkinController = require("../controllers/checkin")
const { ensureAuth } = require("../middleware/auth")

//add specific routes for specific tasks
router.get("/", checkinController.getCheckin)
router.post("/newcheckin", checkinController.addCheckin)

module.exports = router
