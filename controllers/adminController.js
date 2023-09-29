const fs = require("fs")
const Tour = require(".././models/tourModel")
const url = require("url")

const getAllTours = async (req, res) => {
  try {
    let message = req.query.message
    const tours = await Tour.find()
    res.render("index", {
      tours: tours,
      message: message,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}
const createToursPage = async (req, res) => {
  try {
    res.render("create")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editToursPage = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )
    res.render("edit", { tour: tour })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    const success = "data berhasil ditambahkan"
    res.redirect(
      url.format({
        pathname: "/dashboard",
        query: {
          message: success,
        },
      })
    )
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndUpdate(
      id,
      req.body
    )

    const success = "data berhasil diedit"

    res.redirect(
      url.format({
        pathname: "/dashboard",
        query: {
          message: success,
        },
      })
    )
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndRemove(id)

    const success = "data berhasil dihapus"

    res.redirect(
      url.format({
        pathname: "/dashboard",
        query: {
          message: success,
        },
      })
    )
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllTours,
  createToursPage,
  editToursPage,
  getTourById,
  createTour,
  editTour,
  removeTour,
}
