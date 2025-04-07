const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB is not connecting it is getting an error", error.message)
        process.exit(1)
    
        
    }

}

module.exports = connectDB