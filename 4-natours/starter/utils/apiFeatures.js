class APIFeatures {
    constructor(query,queryString) {
        this.query = query
        this.queryString = queryString
    }
    filter() {
        const queryObj = {...this.queryString}
        const excludedFields = ['page','sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])

        // 1B) Advanced filtering 
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|te|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this  
    }
    sort() {
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this  
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }
    paginate() {
        const page = this.queryString.page * 1 || 1; //page number 1 but fisrt make it a number
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        
        this.query = this.query.skip(skip).limit(limit) // we need to skip 10 results before we get to page 2

        return this
    }
}
module.exports = APIFeatures