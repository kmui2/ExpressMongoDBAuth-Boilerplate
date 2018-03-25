import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config/database.js";

// Create a schema to prevent bad input data types
const UserSchema = new mongoose.Schema(
  {
    username: {
		type: String,
		unique: true
	},
    password: {
		type: String,
		unique: true
	},
    name: {
		type: String,
		unique: false
	}
  },
  { collection: "user" }
);

// Salt and Hash password before saving to database
UserSchema.pre("save", function (next) {
  const newUser = this;

  // only hash the password if it has been modified (or is new)
  if (!newUser.isModified("password")) return next();

  bcrypt.genSalt(config.SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      res.status(500).json({ error: "Server Error", success: false });
      return next(err);
    }
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        res.status(500).json({ error: "Server Error", success: false });
        return next(err);
      }
	  newUser.password = hash;
	  next();
    });
  });
});

// Compare the password
UserSchema.methods.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) {
      res.status(500).json({ error: "Server Error", success: false });
      throw err;
    }
    callback(null, isMatch);
  });
};

export default mongoose.model("User", UserSchema);
