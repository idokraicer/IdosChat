import "./App.css";
import Header from "./components/Header";
import Contacts from "./components/ContactsList";
import React, { useState, useEffect, useRef } from "react";
import Chat from "./components/Chat";
import ChatFooter from "./components/ChatFooter";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

// Sockets

function App() {
	// States
	const [contacts, setContacts] = useState([]);
	const [login, setLogin] = useState("");
	const [sideBarToggle, setSideBarToggle] = useState(false);
	const [message, setMessage] = useState({
		message: "",
		time: Date(),
		sender: null,
	});
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();
	const counterRef = useRef();
	const [currentContact, setCurrentContact] = useState(null);
	const [prevContact, setPrevContact] = useState(null);

	//useEffects()
	useEffect(() => {
		setContacts([
			{
				id: 1,
				name: "Leanne Graham",
				username: "Bret",
				email: "Sincere@april.biz",
				address: {
					street: "Kulas Light",
					suite: "Apt. 556",
					city: "Gwenborough",
					zipcode: "92998-3874",
					geo: {
						lat: "-37.3159",
						lng: "81.1496",
					},
				},
				phone: "1-770-736-8031 x56442",
				website: "hildegard.org",
				company: {
					name: "Romaguera-Crona",
					catchPhrase: "Multi-layered client-server neural-net",
					bs: "harness real-time e-markets",
				},
			},
			{
				id: "all",
				name: "Leanne Graham",
				username: "Bret",
				email: "Sincere@april.biz",
				address: {
					street: "Kulas Light",
					suite: "Apt. 556",
					city: "Gwenborough",
					zipcode: "92998-3874",
					geo: {
						lat: "-37.3159",
						lng: "81.1496",
					},
				},
				phone: "1-770-736-8031 x56442",
				website: "hildegard.org",
				company: {
					name: "Romaguera-Crona",
					catchPhrase: "Multi-layered client-server neural-net",
					bs: "harness real-time e-markets",
				},
			},
		]);
		socketRef.current = io.connect("http://localhost:3001");
		console.log("I loaded []");
	}, []);

	useEffect(() => {
		socketRef.current.emit("join-room", prevContact, currentContact);
		socketRef.current.on("recieve-message", ({ message, time, sender }, room) => {
			if(room === currentContact)
			setMessages([...messages, { message, time, sender }]);
		});
		return () => {};
	});

	useEffect(async () => {
		const { value: text } = await Swal.fire({
			input: "text",
			inputLabel: "Username",
			inputPlaceholder: "Type your username here...",
			inputAttributes: {
				"aria-label": "Type your username here",
			},
			showCancelButton: false,
			allowOutsideClick: false,
		});

		if (text !== "") {
			setLogin(text);
		} else {
			window.location.reload();
		}
		socketRef.current.on("connect", () => {
			console.log(`You're connected with id: ${socketRef.current.id}`);
		});
	}, []);

	useEffect(() => {
		socketRef.current.emit("join-room", prevContact, currentContact);
		setMessages([]);
	}, [currentContact]);

	// Refs

	const onMessageSubmit = (e, msg) => {
		socketRef.current.emit("send-message", msg, currentContact);
		e.preventDefault();
		setMessage({ message: "", time: Date(), sender: login });
	};

	const getWindowDimensions = () => {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	};

	return (
		<div className={"App " + (sideBarToggle ? "sidebarOpen" : "")}>
			<nav>
				<Header
					key={"header"}
					sideBarToggle={sideBarToggle}
					setSideBarToggle={setSideBarToggle}
					screenSize={getWindowDimensions()}
					counterRef={counterRef}
					setCurrentContact={setCurrentContact}
				/>
			</nav>
			<main>
				<Chat
					key={"chat"}
					login={login}
					messages={messages}
					setMessages={setMessages}
					message={message}
					socketRef={socketRef}
				/>
			</main>
			<div className='sidebar'>
				<Contacts
					key={"contacts"}
					contacts={contacts}
					setContacts={setContacts}
					currentContact={currentContact}
					setCurrentContact={setCurrentContact}
					setPrevContact={setPrevContact}
				/>
			</div>

			<footer>
				<ChatFooter
					key={"chatFooter"}
					setMessage={setMessage}
					message={message}
					login={login}
					messages={messages}
					setMessages={setMessages}
					onMessageSubmit={onMessageSubmit}
				/>
			</footer>
		</div>
	);
}

export default App;
