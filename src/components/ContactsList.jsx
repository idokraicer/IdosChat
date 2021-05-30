import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import Contact from "./Contact";

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
}) {
	const classes = useStyles();

	return (
		<List key={"contactList"} className={classes.root}>
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
					/>
				);
			})}
		</List>
	);
}
