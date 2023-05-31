const fs = require("fs");
module.exports = (app, users, upload) => {
  // Middleware for validate req.body entries
  const validateRegisterForm = (req, res, next) => {
    const user = req.body;
    // console.log(user);
    let error = [];
    // Finding user or email that have already been registered
    if (
      users.find((us) => us.username === user.username) ||
      users.find((us) => us.email === user.email)
    )
      error.push("Username or email is already registered.");
    // Validating if email requeriments are correct
    if (!user.email.match(/^[\w-\.]+@([\w-]{3,}\.)+[\w-]{2,}$/gi))
      error.push("Email is invalid.");
    // Validating if password requeriments are correct
    if (
      !user.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
      )
    )
      error.push(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 special character and 8 chars."
      );
    // If there are errors, then delete the image uploaded and return error
    if (error.length > 0) {
      fs.unlinkSync(req.file.path);
      return res.status(401).json({ error });
    }
    // Else continue with the registration process
    next();
  };
  // Creating route for registration
  app.post(
    "/auth/register",
    upload.single("image"), // using multer for manage the formdata
    validateRegisterForm, // validation middleware
    (req, res) => {
      const user = req.body;
      user.image = req.file.path;
      // console.log(req.file);
      // console.log(req.body.image);
      users.push(user); // save the user

      res.status(201).json({ user });
    }
  );
};
