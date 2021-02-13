import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { MinImg, Button, Carousel } from "../components/";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
	},
	img: {
		width: "100%",
	},
	box: {
		flex: "1 1 0%",
		padding: theme.spacing(4),
	},
	panel: {
		width: 368,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	input: {
		display: "none",
		"&:checked + label": {
			borderColor: "black",
		},
		"&:disabled + label": {
			cursor: "default",
			color: "#ccc",
		},
	},
	label: {
		width: "100%",
		cursor: "pointer",
		border: "1px solid #ccc",
		borderRadius: "0.4em",
		lineHeight: "48px",
		display: "block",
		textAlign: "center",
	},
	form: {
		marginTop: theme.spacing(4),
	},
	sizesWrap: {
		display: "grid",
		gap: 8,
		marginBottom: theme.spacing(4),
	},
}));

export default function Item({ db, addToBag }) {
	const classes = useStyles();

	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const initialActive = params.get("id") || 0;
	const [active, setActive] = React.useState(initialActive);

	const { id, name } = useParams();
	const title = name.replace(/_/g, " ");
	const [data] = db.filter(item => item.title === title);

	const [size, setSize] = React.useState("");

	const minImgUrls =
		data &&
		data.colorway.reduce((acc, cur) => {
			acc.push(cur.minImg);
			return acc;
		}, []);

	const width =
		data &&
		Math.max(...data.colorway[active].sizes.map(item => item.size.length)) * 8 + 24 + "px";

	const imageClickHandler = e => {
		setSize("");
		setActive(e.target.dataset.value);
	};

	const radioChangeHandler = e => {
		setSize(e.target.value);
	};

	const addProduct = () => {
		const { title, subtitle, colorway } = data;
		const product = {
			id: size + title + colorway[active].colorName,
			title: title,
			subtitle: subtitle,
			color: colorway[active].colorName,
			selectedSize: size,
			sizes: colorway[active].sizes.filter(size => size.quantity).map(item => item.size),
			quantity: 1,
			price: colorway[active].price,
			imageUrl: colorway[active].minImg,
			url: "/" + id + "/" + name + search,
		};

		addToBag(product);
	};

	return (
		!!data && (
			<Container className={classes.container} maxWidth="lg">
				<Hidden smDown>
					<Box className={classes.box}>
						<Grid container spacing={1} alignItems="center">
							{data.colorway[active].collectionImg.map((url, index) => (
								<Grid item xs={6} key={index}>
									<img
										src={"../images" + url}
										alt={"shoes" + index}
										className={classes.img}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</Hidden>

				<Container className={classes.panel}>
					<Grid container spacing={1}>
						<Grid item xs>
							<Typography variant="subtitle1" component="h2">
								{data.subtitle}
							</Typography>
							<Typography variant="h5" component="h1">
								{data.title}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<span>${data.colorway[active].price}</span>
						</Grid>
					</Grid>

					<Hidden mdUp>
						<Carousel>{data.colorway[active].collectionImg}</Carousel>
					</Hidden>

					{data.colorway.length > 1 && (
						<MinImg urls={minImgUrls} handler={imageClickHandler} link />
					)}

					<FormControl fullWidth className={classes.form}>
						<Grid container justify="space-between">
							<Typography variant="subtitle1" component="h3">
								Select Size
							</Typography>
						</Grid>

						<div
							className={classes.sizesWrap}
							style={{
								gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))`,
							}}
						>
							{data.colorway[active].sizes.map((item, index) => (
								<div className={classes.size} key={item.size}>
									<input
										type="radio"
										name="size"
										id={"size" + item.size}
										className={classes.input}
										value={item.size}
										disabled={item.quantity > 0 ? false : true}
										onChange={radioChangeHandler}
										checked={size === item.size}
									/>
									<label htmlFor={"size" + item.size} className={classes.label}>
										{item.size}
									</label>
								</div>
							))}
						</div>

						<Button onClick={addProduct} disabled={size === ""}>
							Add to Bag
						</Button>
					</FormControl>
				</Container>
			</Container>
		)
	);
}
