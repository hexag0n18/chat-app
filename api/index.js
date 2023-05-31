const express = require("express");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
}); // Setting socket.io
// const log = require("socket.io")(server); // Setting socket.io

const bodyParser = require("body-parser");

// local imports
const chatService = require("./chat");
const register = require("./routes/register");
const { verifyAuth } = require("./middleware/verifyAuth");
const login = require("./routes/login");
const runLogService = require("./socket");
const settings = require("./routes/settings");

const port = process.env.PORT || 3000;

// Configurations for multer
const fileFilter = (req, file, call) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"]; // setting allowed types
  if (!allowedTypes.includes(file.mimetype)) {
    const err = new Error("Invalid file type");
    return call(err, false);
  }
  call(null, true);
};
const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./uploads"); // setting upload destination
  },
  filename: (req, file, call) =>
    call(null, Date.now() + "-" + file.originalname), // naming convention
});

const upload = multer({ storage, fileFilter });

// Database in memory (with testing users)
let users = [
  {
    username: "Josh",
    email: "josh@abypro.com",
    password: "!Starcraft2",
    image: "uploads/1685541053770-2961153.png",
  },
  {
    username: "William",
    email: "asd@asd.com",
    password: "!Starcraft2",
    image:
      "uploads/1685545358342-wp10252262-business-intelligence-wallpapers.jpg",
  },
];
let tokens = [];

// Initialize server
server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Configurations
var corsOptions = {
  origin: "http://localhost:4000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // CORS Policy Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(express.static(path.join(__dirname, "chat/public")));

app.get("/api", (req, res) => {
  res.json({ users, tokens });
});

register(app, users, upload);
login(app, users, tokens);
settings(app, users, { verifyAuth });

app.get("/verify", verifyAuth, (req, res) => {
  return res.json({ response: true });
});
app.get("/api/test", verifyAuth, (req, res) => {
  return res.json({ token: req.headers["x-access-token"] });
});

// io.engine.use(verifyAuth)
runLogService(io);
// chatService(io);
