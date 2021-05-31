import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";

import Contact from "./Contact";
import { IconButton, InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "blocked",
	},
}));

export default function ContactsList({
	contacts,
	setContacts,
	currentContact,
	setCurrentContact,
	setPrevContact,
}) {
	const classes = useStyles();

	return (
		<List key={"contactList"} className={classes.root}>
			<div className={classes.search}>
				<IconButton>
					<AddIcon />
				</IconButton>
				<InputBase
					placeholder='Add conversation..'
					inputProps={{ "aria-label": "search" }}
				/>
			</div>
			{contacts.map((contact, index) => {
				return (
					<Contact
						key={("contact", index)}
						contacts={contacts}
						contact={contact}
						index={index}
						last={index === contacts.length - 1}
						setContacts={setContacts}
						currentContact={currentContact}
						setCurrentContact={setCurrentContact}
						setPrevContact={setPrevContact}
					/>
				);
			})}
		</List>
	);
}
