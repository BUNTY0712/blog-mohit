const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog-app-home");
    console.log(`Connected to Mongodb database`.bgMagenta.white);
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
// 	try {
// 		await mongoose.connect('mongodb://localhost:27017', {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		console.log('Connected to MongoDB Database'.bgMagenta.white);
// 	} catch (error) {
// 		console.error(`MongoDB Connection Error: ${error.message}`.bgRed.white);
// 		process.exit(1); // Exit process with failure
// 	}
// };

// module.exports = connectDB;
