import User from "./user.model.js";
import jwt from "jsonwebtoken";
import config from "../../config/database.js";

export function register(req, res) {
  const username = req.body.username,
    password = req.body.password,
    name = req.body.name;

  if (!username || !password || !name)
    return res
      .status(500)
      .json({ error: "Missing credentials", success: false });

  const user = new User({
    username: username,
    password: password,
    name: name
  });

  user.save(err => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000)
        return res
          .status(500)
          .json({ error: "Username already exists", success: false });

      console.error(err);
      return res.status(500).send(err);
    }

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id
      },
      config.secret,
      { expiresIn: 8640 } // expires in 24 hours
    );

    console.log("User " + user.username + " registered!");
    return res.json({ success: true, token: token });
  });
}

export function login(req, res) {
  const username = req.body.username,
    password = req.body.password;

  if (!username || !password)
    return res
      .status(500)
      .json({ error: "Missing username or password", success: false });

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (!user) return res.json({ error: "Username or Password is incorrect", success: false });

    user.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      if (!isMatch)
        return res.json({
          error: "Username or Password is incorrect",
          success: false
        });

      const token = jwt.sign(
        {
          username: user.username,
          id: user._id
        },
        config.secret,
        { expiresIn: 86400 } // expires in 24 hours
      );
      console.log("User " + user.username + " signed in!");
      return res.json({ success: true, token: token });
    });
  });
}
