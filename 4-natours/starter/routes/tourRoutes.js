const express = require('express');
const app = require('../app');
const tourController = require('./../controllers/tourController');
// const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('./../controllers/tourController')

const router = express.Router()

router.param('id', tourController.checkID)

// Create a checkbody middleware
// check if body contains the name and price properties
// if not, send back 400 ( bad request)
// add it to the post handler stack

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createTour)

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router