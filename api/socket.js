function runLogService(io) {
  let usersIn = [];

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
      ++numUsers;
      console.log(numUsers);
      console.log(socket.username);
      socket.emit("user login", {
        userList: usersIn.map((user) => user.username),
        numUsers: numUsers,
      });
      socket.broadcast.emit("user login", {
        userList: usersIn.map((user) => user.username),
        numUsers: numUsers,
      });
    });
    // when the user disconnects.. perform this
    socket.on("disconnect", () => {
      --numUsers;
      console.log(usersIn);
      usersIn.splice(
        usersIn.findIndex((item) => item.username === socket.username),
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
