import Book from "./book.model.js";

//Basic CRUD

// READ
// "getById" - will grab all for display
export function getById(req, res) {
  Book.find({ _id: req.params.id })
  .then((result) => {
    return res.json(result);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  });
}

// "getByRating" - will grab all for display
export function getByRating(req, res) {
  Book.find({ rating: { $gte: req.params.rating } })
  .then((result) => {
    return res.json(result);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  });
}

// "getAllAuthors" - will grab all authors for display
export function getAllAuthors(req, res) {
  Book.find({}, { author: 1, _id: 0 })
  .then((result) => {
    return res.json(result);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  });
}

// CREATE
// "add" - will create a new post
export function add(req, res) {
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

  book.save().then((result) => {
    return res.json(result);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  });
}

// UPDATE
// "updateRating" - will edit exsisting one
export function updateRating(req, res) {
  if (!req.body.id) {
    return res.status(400).send("Need to add an id in body");
  } else if (typeof req.body.rating != "number") {
    return res.status(400).send("Need to add rating");
  }

  Book.update(
    { _id: req.body.id },
    { $set: { rating: req.body.rating } })
  .then((result) => {
    return res.json(result);
  }).
  catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  })
}

// DELETE
// "delete" - removes a document from database
// WARNING: No undo so delete at own cost
export function remove(req, res) {
  // SHOULD have authenticaton token so no one can just randomly call the delete URL

  Book.findOneAndRemove({ _id: req.params.id })
  .then((result) => {
    return res.json(result);
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  });
}
