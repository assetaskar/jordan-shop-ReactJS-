import React from "react";
import { NavLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles(theme => ({
	buttonImage: {
		width: "100%",
	},
	image: {
		height: "100%",
		marginRight: theme.spacing(1),
	},
	div: {
		height: 50,
	},
	link: {
		display: "inline-block",
		borderRadius: ".5em",
		overflow: "hidden",
	},
	activeLink: {
		border: "2px solid #aaa",
	},
}));

export default function MinImg({ urls, link = false, handler }) {
	const classes = useStyles();

	if (link) {
		return (
			!!urls && (
				<Box>
					<Grid container spacing={2}>
						{urls.map((url, index) => {
							return (
								<Grid item xs={3} key={index}>
									<NavLink
										strict
										to={"?id=" + index}
										activeClassName={classes.activeLink}
										className={classes.link}
										isActive={(match, location) => {
											const params = new URLSearchParams(location.search);
											const active = parseInt(params.get("id")) || 0;
											return active === index;
										}}
									>
										<ButtonBase onClick={handler}>
											<img
												src={"../images" + url}
												data-value={index}
												className={classes.buttonImage}
												alt={"shoes" + index}
											/>
										</ButtonBase>
									</NavLink>
								</Grid>
							);
						})}
					</Grid>
				</Box>
			)
		);
	}

	return (
		!!urls && (
			<div className={classes.div}>
				{urls?.map((url, index) => (
					<img
						key={index}
						src={"../images/" + url}
						alt={"shoes" + index}
						className={classes.image}
						data-active={index}
						onMouseEnter={handler}
					></img>
				))}
			</div>
		)
	);
}
