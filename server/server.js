const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});
const PORT = 3001;

io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("send-message", ({ message, time, sender }, room = "all") => {
		if (message !== "") {
			// if (room === null || room === "" || room === "all") {
			io.emit("recieve-message", { message, time, sender }, (room = "all"));
			console.log(`Message: ${message} was send without a room`);
			console.log();
			/*}  else {
				io.to(room).emit("recieve-message", { message, time, sender });
				console.log(`Message: ${message} was sent to room: ${room}`);
			} */
		}
	});

	socket.on("join-room", (prevRoom, room) => {
		socket.leave(prevRoom);
		socket.join(room);
		console.log(
			`User ${socket.id} left room ${prevRoom} and joined room ${room}`
		);
		console.log(`Participants in room ${room} are:`);
		var connections = io.sockets.adapter.rooms.get(room);
		for (let c of connections) {
			console.log(c);
		}
	});
});

http.listen(PORT, () => console.log("Server is running on port " + PORT));
