const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URL);
    console.log("connected successfully");
  } catch (error) {
    throw new Error(error);
    console.log("connect mongodb error");
  }
};

module.exports = dbConnect;
