const mongoose = require("mongoose");
var isValid = mongoose.Types.ObjectId.isValid("5c0a7922c9d89830f4911426"); //true

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("Invalid MongoDB Id");
  }
};

module.exports = { validateMongoDbId };
