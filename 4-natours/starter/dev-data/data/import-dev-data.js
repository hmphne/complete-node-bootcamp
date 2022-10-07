const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfull!'));

mongoose.set('useCreateIndex', true)


// READ json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8')) 
 
//IMPORT data into DB 
const importData = async ()=> {
    try {
        await Tour.create(tours)
        console.log('Data successfully loaded')

    } catch (err) {
        console.log(err.message)
    }
    process.exit()

}  

// DELETE all data from collection
const deleteData = async ()=> {
    try {
        await Tour.deleteMany()
        console.log('Data successfully deleted ')
    } catch (err) {
        console.log(err.message)
    }
    process.exit()

}


if (process.argv[2] === '--import') {
    importData()
}else if (process.argv[2] === '--delete') {
    deleteData()
}
