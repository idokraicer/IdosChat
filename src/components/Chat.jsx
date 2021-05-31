import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Message from "./Message";

// Sockets

export default function Chat({ login, messages }) {
	const renderChat = () => {
		console.log(messages);
		return messages.map((message, index) => {
			return (
				<Message
					key={"Message" + index}
					message={message}
					prevMessage={index == 0 ? null : messages[index - 1]}
					login={message.sender === login}
				/>
			);
		});
	};

	useEffect(() => {
		scrollRef.current.scrollIntoView();
	}, [, messages]);

	useEffect(() => {
		renderChat();
		console.log("Messages changed - chat");
	}, [messages]);

	const scrollRef = useRef();
	return (
		<div
			className='chat-root'
			id='chat-root'
			style={{
				display: "flex",
				flexDirection: "column",
				wordBreak: "break-all",
			}}>
			{renderChat()}
			{/* {messages.map((message, index) => {
				return (
					<Message
						key={"Message" + index}
						message={message}
						prevMessage={index == 0 ? null : messages[index - 1]}
						login={message.sender === login}
					/>
				);
			})} */}
			<div id='scroll-to' ref={scrollRef}></div>
		</div>
	);
}
