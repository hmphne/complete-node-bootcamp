const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app')

dotenv.config({ path: './config.env'})
// console.log(process.env)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose
// .connect(DB, {

.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connection established')
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
}) 