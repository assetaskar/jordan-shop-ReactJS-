import React from "react";

import UIButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
	button: {
		color: "white",
		backgroundColor: "black",
		padding: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#2b2b2b",
		},
		"&.Mui-disabled": {
			backgroundColor: "transparent",
			border: "1px solid #ccc",
			color: "#ccc",
		},
	},
}));

export default function Button(props) {
	const classes = useStyle();

	return (
		<UIButton
			onClick={props.onClick}
			fullWidth
			className={classes.button}
			disabled={props.disabled}
		>
			{props.children}
		</UIButton>
	);
}
