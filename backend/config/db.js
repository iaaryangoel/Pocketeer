const mongoose = require("mongoose")

const conncectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
};

module.exports = conncectDB;