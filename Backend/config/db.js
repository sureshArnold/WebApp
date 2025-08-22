const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


// // module.exports = connectDB;
// const dburl = "mongodb://127.0.0.1:27017/libraryDB2"
// mongoose.connect(dburl).then((result)=>{
//     console.log("Success connected to Database")
// }).catch((error)=>{
//     console.log("Error connecting to db" , error)
// })

//****************** */

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
