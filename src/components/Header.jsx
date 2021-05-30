import React from "react";
import "../App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
	fade,
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from "@material-ui/core/styles";

const mytheme = createMuiTheme({
	palette: {
		primary: {
			light: "#80e27e",
			main: "#4CAF50",
			dark: "#087f23",
			contrastText: "#eee",
		},
		secondary: {
			light: "#ffc947",
			main: "#FF9800",
			dark: "#c66900",
			contrastText: "#000",
		},
	},
});
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function Header({
	sideBarToggle,
	setSideBarToggle,
	Screen,
	counterRef,
	setCurrentContact,
}) {
	const classes = useStyles();
	return (
		<div className='header'>
			<div className={classes.root}>
				<ThemeProvider theme={mytheme}>
					<AppBar position='static'>
						<Toolbar>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='open drawer'
								hidden={Screen > 1000 ? "hidden" : ""}
								onClick={() => setSideBarToggle(!sideBarToggle)}>
								<MenuIcon />
							</IconButton>
							<Typography className={classes.title} variant='h6' noWrap>
								Ido's Messages App - {counterRef.current} connections
							</Typography>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder='Search…'
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ "aria-label": "search" }}
									onChange={(e) => setCurrentContact(e.target.value)}
								/>
							</div>
						</Toolbar>
					</AppBar>
				</ThemeProvider>
			</div>
		</div>
	);
}
