function runLogService(io) {
  let usersIn = [];
  let usersInRoom = [];

  let numUsers = 0;
  io.on("connection", (socket) => {
    // let addedUser = false;
    // ++numUsers;
    console.log("Connected users: " + numUsers);

    // when the client emits 'add user', this listens and executes
    socket.on("login", (username) => {
      // we store the username in the socket session for this client
      socket.username = username;
      usersIn.push({ username });
      // console.log(numUsers);
      // console.log(socket.username);
      socket.emit("user login", {
        userList: usersIn.map((user) => user.username),
        numUsers: usersInRoom.length,
      });
      socket.broadcast.emit("user login", {
        userList: usersIn.map((user) => user.username),
        numUsers: usersInRoom.length,
      });
    });

    socket.on("join", () => {
      usersInRoom.push({ user: socket.username });

      socket.emit("user joined", {
        users: usersInRoom.length,
        user: socket.username,
      });
      socket.broadcast.emit("user joined", {
        users: usersInRoom.length,
        user: socket.username,
      });
    });

    socket.on("us leave", () => {
      usersInRoom.splice(
        usersInRoom.findIndex((item) => item.user === socket.username),
        1
      );
      console.log(usersInRoom);
      socket.emit("user left", {
        users: usersInRoom.length,
        user: socket.username,
      });
      socket.broadcast.emit("user left", {
        users: usersInRoom.length,
        user: socket.username,
      });
    });

    socket.on("new message", (message) => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit("new message", {
        username: socket.username,
        message: message,
      });
    });

    // when the user disconnects.. perform this
    socket.on("disconnect", () => {
      console.log(usersIn);
      usersIn.splice(
        usersIn.findIndex((item) => item.username === socket.username),
        1
      );
      usersInRoom.splice(
        usersInRoom.findIndex((item) => item.user === socket.username),
        1
      );
      console.log("Connected users: " + numUsers);
      // echo globally that this client has left
      socket.broadcast.emit("user logout", {
        userList: usersIn.map((user) => user.username),
        numUsers: numUsers,
      });
    });
  });
}
module.exports = runLogService;
