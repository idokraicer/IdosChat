import React from "react";

export default function Message({ message, prevMessage, login }) {
	const calculateTime = () => {
		const t = message.time;
		let idx = t.indexOf(":") - 2;
		let hoursAndMinutes = t.slice(idx, idx + 9);

		return hoursAndMinutes;
	};
	return (
		<div
			className='message-container'
			style={{ alignSelf: login ? "flex-end" : "flex-start" }}>
			<div className='message-text'>
				<span style={{ color: "#FF0000", fontWeight: "bold" }}>
					{login
						? ""
						: prevMessage === null || prevMessage.sender === message.sender
						? ""
						: message.sender + ": "}
				</span>
				{message.message}
			</div>
			<div className='timespan'>{calculateTime()}</div>
		</div>
	);
}
