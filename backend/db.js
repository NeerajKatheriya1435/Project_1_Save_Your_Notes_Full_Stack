const mongoose = require("mongoose");
const mongooseURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=20000&appName=mongosh+2.0.2"
const connectToMongodb = () => {
    mongoose.connect(mongooseURI)
    console.log("Connected to Mongodb Database...")
}
module.exports = connectToMongodb;