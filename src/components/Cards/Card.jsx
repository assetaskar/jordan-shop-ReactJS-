import React from "react";
import { Link } from "react-router-dom";
import MinImg from "components/ImagesCollection/MinImg";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
	media: {
		width: "100%",
		height: "31vw",
		[theme.breakpoints.down("sm")]: {
			height: "90vw",
		},
		[theme.breakpoints.only("sm")]: {
			height: "43vw",
		},
	},
	box: {
		lineHeight: "50px",
		fontSize: theme.spacing(2),
	},
	collection: {
		height: 50,
	},
	image: {
		height: "100%",
		marginRight: theme.spacing(1),
	},
	link: {
		textDecoration: "none",
		color: "initial",
	},
	card: {
		flexGrow: 1,
	},
	area: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	content: {
		width: "100%",
		flexGrow: 1,
	},
}));

export default function CustomCard(props) {
	const classes = useStyles();
	const [active, setActive] = React.useState(0);
	const [isCollection, setIsCollection] = React.useState(false);

	const item = props.item;
	const imagesUrl = item.colorway.map(item => item.minImg);
	const url = isCollection
		? `/catalog/${item.title.replace(/\s/g, "_")}?id=${active}`
		: `/catalog/${item.title.replace(/\s/g, "_")}`;

	function mouseEnterHandler() {
		if (item.colorway.length < 2) return;
		setIsCollection(true);
	}

	function mouseLeaveHandler() {
		isCollection && setIsCollection(false);
	}

	function hoverImagesHandler(e) {
		setActive(e.target.dataset.active);
	}

	return (
		<Grid container item xs={12} sm={6} md={4} alignItems="stretch">
			<Card className={classes.card}>
				<Link to={url} className={classes.link}>
					<CardActionArea
						onMouseEnter={mouseEnterHandler}
						onMouseLeave={mouseLeaveHandler}
						className={classes.area}
					>
						<CardMedia
							className={classes.media}
							image={"./images/" + item.colorway[active].collectionImg[0]}
							title="Image"
						/>

						<CardContent className={classes.content}>
							<Typography variant="h6" component="h2">
								{item.title}
							</Typography>

							<Typography variant="subtitle1" color="textSecondary" component="h3">
								{item.subtitle}
							</Typography>

							{!isCollection && (
								<Box component="div" className={classes.box} color="text.secondary">
									{item.colorway.length > 1 ? item.colorway.length + " Colors" : "1 Color"}
								</Box>
							)}

							{item.colorway.length > 1 && isCollection && (
								<MinImg urls={imagesUrl} handler={hoverImagesHandler} />
							)}

							<Typography variant="body2" component="div">
								${item.colorway[active].price}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
			</Card>
		</Grid>
	);
}
