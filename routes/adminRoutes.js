const express = require("express")
const adminController = require("../controllers/adminController")

const router = express.Router()

// router.param("id", tourController.checkId)

router.route("/").get(adminController.getAllTours)
router
  .route("/create")
  .get(adminController.createToursPage)
  .post(adminController.createTour)

router
  .route("/delete/:id")
  .get(adminController.removeTour)

router
  .route("/edit/:id")
  .get(adminController.editToursPage)
  .post(adminController.editTour)

module.exports = router
