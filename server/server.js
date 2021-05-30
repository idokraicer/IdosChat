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

	socket.on("message", ({ message, time, sender }, room) => {
		console.log("message event to room " + room);
		if (message !== "") {
			if (room === null) {
				socket.emit("message", { message, time, sender });
				console.log(`Message: ${message}`);
			} else socket.to(room).emit("message", { message, time, sender });
		}
	});
	socket.on("join-room", (room) => {
		socket.join(room);
	});
});

http.listen(PORT, () => console.log("Server is running on port " + PORT));
