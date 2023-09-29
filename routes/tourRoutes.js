const express = require("express")
const tourController = require("../controllers/toursController")

const router = express.Router()

// router.param("id", tourController.checkId)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour)

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.editTour)
  .delete(tourController.removeTour)

module.exports = router
