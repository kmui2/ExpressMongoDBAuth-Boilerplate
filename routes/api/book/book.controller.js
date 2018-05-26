import Book from "./book.model.js";

//Basic CRUD

// READ
// "getById" - will grab all for display
export async function getById(req, res) {
  try {
    const result = await Book.find({ _id: req.params.id });
    return res.json(result);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  };
}

// "getByRating" - will grab all for display
export async function getByRating(req, res) {
  try {
    const result = Book.find({ rating: { $gte: req.params.rating } });
    return res.json(result);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

// "getAllAuthors" - will grab all authors for display
export async function getAllAuthors(req, res) {
  try {
    const result = await Book.find({}, { author: 1, _id: 0 });
    return res.json(result);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  };
}

// CREATE
// "add" - will create a new post
export async function add(req, res) {
  // Check and make sure they supplied all parts of body
  // Note that since rating is a number that if you check for false a value of zero returns true
  if (
    !req.body.title ||
    !req.body.author ||
    typeof req.body.rating != "number"
  ) {
    return res
      .status(400)
      .send("Need a valid title, author, and rating in post body");
  }

  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    rating: req.body.rating
  });

  try {
    const result = await book.save();
    return res.json(result);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  };
}

// UPDATE
// "updateRating" - will edit exsisting one
export async function updateRating(req, res) {
  if (!req.body.id) {
    return res.status(400).send("Need to add an id in body");
  } else if (typeof req.body.rating != "number") {
    return res.status(400).send("Need to add rating");
  }

  try {
    const result = Book.update(
      { _id: req.body.id },
      { $set: { rating: req.body.rating } });
    return res.json(result);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

// DELETE
// "delete" - removes a document from database
// WARNING: No undo so delete at own cost
export async function remove(req, res) {
  // SHOULD have authenticaton token so no one can just randomly call the delete URL

  try {
    const result = await Book.findOneAndRemove({ _id: req.params.id });
    return res.json(result);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  };
}
