const { Schema, model } = require("mongoose");

const UserSchemna = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchemna);
