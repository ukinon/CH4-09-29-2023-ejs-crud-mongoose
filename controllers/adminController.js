const fs = require("fs")
const Tour = require(".././models/tourModel")
const url = require("url")

const getAllTours = async (req, res) => {
  try {
    const { price, name, rating } = req.query

    const condition = {}
    if (price) {
      condition.price = { $gt: price }
    }
    if (name) {
      condition.name = {
        $regex: ".*" + name + ".*",
        $options: "i",
      }
    }
    if (rating) {
      condition.rating = {
        $gt: rating,
      }
    }

    const tours = await Tour.find(condition)
    const message = req.flash("message", "")

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
    await Tour.create(req.body)
    req.flash("message", "ditambahkan")
    res.redirect("/dashboard")
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

    await Tour.findByIdAndUpdate(id, req.body)

    req.flash("message", "dirubah")

    res.redirect("/dashboard")
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

    req.flash("message", "dihapus")

    await Tour.findByIdAndRemove(id)

    res.redirect("/dasboard")
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
