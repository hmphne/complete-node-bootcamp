const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type:Number,
      required:[true, 'A tour must have a Group Size']
    },
    difficulty: {
      type:String,
      required:[true, 'A tour must have a difficulty']
    },
    ratingsAverage:{
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default:0
    },
    price:{
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount:Number,
    summary: {
      type:String,
      required:[true, 'A tour must have a summary'],
      trim:true //removes the white space from the beggining and the end of the strings
    },
    description: {
      type:String,
      trim:true
    },
    imageCover: {
      type: String,
      required:[true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type:Date,
      default: Date.now(),
      select: false
    },
    startDates : [Date],
    secretTour: {
      type:Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals:true },
    toObject: { virtuals:true }
  })
  
tourSchema.virtual('durationWeeks').get(function () { // Arrow function does not use "this" jeyword
  return this.duration / 7
})
 

// DOCUMENT middleware, runs before the save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true})
  next()
})

// tourSchema.post('save', function(doc, next) {
//   console.log(doc)
//   next()
// })


// QUERY middleware, runs after the save() and .create()
tourSchema.pre(/^find/, function(next) {
  // tourSchema.pre('find', function(next) {
  this.find({secretTour: { $ne: true } })

  this.start = Date.now()
  next()
})

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds to complete.`)
  // console.log(docs)
  next()

})

const Tour = mongoose.model('Tour', tourSchema) 

module.exports = Tour