module.exports = (app, users, { verifyAuth }) => {
  app.post("/api/user", verifyAuth, (req, res) => {
    const index = users.findIndex((us) => us.username === req.body.user);
    const user = { ...users[index] };
    delete user.password; // for not reveal the password
    // console.log(req.body);
    return res.json({ user, index });
  });
  app.post("/api/edit", verifyAuth, (req, res) => {
    const data = req.body;
    // Finding user that has already been registered
    let usrs = [...users];
    usrs.splice(data.index, 1);
    // console.log(data);
    // console.log(users);
    if (usrs.find((us) => us.username === data.username))
      return res
        .status(400)
        .json({ message: "This username has already taken" });

    if (data.password !== users[data.index].password)
      return res.status(400).json({ message: "Password incorrect" });

    if (
      !data.new_password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
      )
    )
      return res
        .status(400)
        .json({ message: "Password doesn't meet the requeriments" });
    users[data.index].username = data.username;
    users[data.index].password = data.new_password;
    // console.log(users);
    return res.json({ user: data.username });
  });
};
