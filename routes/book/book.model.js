import mongoose from "mongoose";

// Create a schema to prevent bad input data types
// Google "Mongoose Schema datatypes" for more help
// Also if you want an value to be whatever just use
// myRandomValue : {}
const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    rating: Number
  },
  { collection: "book" }
);

export default mongoose.model("Book", BookSchema);
