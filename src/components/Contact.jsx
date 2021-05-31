import React from "react";

import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { fade, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	listitem: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.black, 0.15),
		},
		"&:active": {
			backgroundColor: fade(theme.palette.common.black, 0.35),
			color: theme.palette.common.black,
		},
		transition: "0.15s",
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
}));
export default function Contact({
	contacts,
	currentContact,
	setCurrentContact,
	contact,
	index,
	last,
	setPrevContact,
}) {
	const classes = useStyles();
	return (
		<a
			onClick={() => {
				setPrevContact(currentContact);
				setCurrentContact(contact.id);
			}}>
			<ListItem className={classes.listitem} alignItems='flex-start'>
				<ListItemAvatar>
					<Avatar
						alt={contact.name}
						src={`https://loremflickr.com/320/240?lock=${contact.id}`}
					/>
				</ListItemAvatar>
				<ListItemText
					primary={contact.name}
					secondary={contact.company.catchPhrase}
				/>
			</ListItem>
			{last ? "" : <Divider component='li' />}
		</a>
	);
}
