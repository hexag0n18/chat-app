const jwt = require("jsonwebtoken");

module.exports = (app, users, tokens) => {
  // Creating route for login
  app.post("/auth/login", (req, res) => {
    const { email, password } = req.body; // destructuring fields
    const user = { ...users.find((us) => us.email === email) }; // clonning a user finded into "user" constant
    // console.log(user);
    // console.log(req.body);
    // Verifying if user exists
    if (!user)
      return res
        .status(404)
        .json({ error: "Email or password are incorrect." });

    // Verifying if user password is correct
    if (password !== user.password)
      return res
        .status(404)
        .json({ error: "Email or password are incorrect." });
    const index = tokens.findIndex((item) => item.user == user.username); // finding position of the user's token
    let token = "";
    // if user's token exists
    if (index >= 0) {
      const existing_token = tokens[index];
      // Verifying if token has already expired
      jwt.verify(
        existing_token.token,
        process.env.SECRET_KEY,
        (err, decoded) => {
          if (err) {
          } else token = existing_token.token;
        }
      );
    }
    // Creating if there is no user's token
    if (!token)
      token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: 3600,
      });
    // req.session.token = token;
    tokens.splice(index, 1); // removing old token
    tokens.push({ user: user.username, token }); // adding new token
    delete user.password; // for not reveal the password
    return res.json({ user, token });
  });
};
