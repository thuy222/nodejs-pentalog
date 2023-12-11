const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnect;
