import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import "../App.css";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(0),
		flex: 1,
		display: "flex",
		alignItems: "center",
		backgroundColor: "#4caf50",
		padding: "1rem",
	},
	send: {
		justifySelf: "flex-end",
	},
}));

export default function ChatFooter({ onMessageSubmit, login }) {
	const classes = useStyles();
	const [localMessage, setLocalMessage] = useState({
		message: "",
		time: Date(),
		sender: login,
	});
	return (
		<Grid container spacing={0} className={classes.root} style={{}}>
			<Grid item xs={1} />
			<Grid item xs={10}>
				<div className='text-container'>
					<TextField
						id='filled-textarea'
						label='Send a message'
						multiline
						value={localMessage.message}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								onMessageSubmit(e, localMessage);
								setLocalMessage({ message: "" });
							}
						}}
						onChange={(e) =>
							setLocalMessage({
								message: e.target.value,
								time: Date(),
								sender: login,
							})
						}
						style={{
							width: "100%",
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position='end'
									onClick={(e) => {
										onMessageSubmit(e, localMessage);
										setLocalMessage({ message: "" });
									}}
									style={{ paddingBottom: "0.7em" }}>
									<IconButton>
										<SendRoundedIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	);
}
