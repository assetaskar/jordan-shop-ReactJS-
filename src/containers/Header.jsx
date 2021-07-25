import React from "react";
import { Link, NavLink } from "react-router-dom";
import jordan from "icons/jordan.svg";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles(theme => ({
	link: {
		color: "initial",
		"&:not(:last-child)": {
			marginRight: theme.spacing(3),
		},
	},
	header: {
		backgroundColor: "#eeeeee",
		color: "#000000",
		marginBottom: 24,
	},
	activeLink: {
		color: "white",
		"& .MuiButton-root": {
			backgroundColor: "dimgray",
		},
	},
	cart: {
		color: "rgba(0,0,0,0.7)",
	},
}));

function Header({ length }) {
	const classes = useStyles();

	return (
		<AppBar position="sticky" className={classes.header}>
			<Toolbar>
				<Box>
					<Link to="/">
						<IconButton disableFocusRipple>
							<img src={jordan} alt="logo" />
						</IconButton>
					</Link>
				</Box>

				<Box flexGrow="1" textAlign="center">
					<NavLink exact to="/men" activeClassName={classes.activeLink} className={classes.link}>
						<Button disableFocusRipple color="inherit">
							Men
						</Button>
					</NavLink>

					<NavLink to="/women" activeClassName={classes.activeLink} className={classes.link}>
						<Button disableFocusRipple color="inherit">
							Women
						</Button>
					</NavLink>
				</Box>

				<Box>
					<Link to="/cart">
						<IconButton disableFocusRipple className={classes.cart}>
							<Badge badgeContent={length} color="secondary">
								<ShoppingCartOutlinedIcon />
							</Badge>
						</IconButton>
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
