import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
	bag: {
		display: "flex",
		flexWrap: "wrap",
		backgroundColor: "#f6f6f6",
		border: "1px solid #ccc",
		padding: theme.spacing(1),
		marginBottom: theme.spacing(3),
	},
	image: {
		width: 150,
		"& img": {
			width: "100%",
		},
	},
	info: {
		flexGrow: 1,
		padding: "0 20px",
	},
	price: {
		width: 100,
	},
	formControl: {
		"&:not(:last-child)": {
			marginRight: theme.spacing(2),
		},
	},
	remove: {
		textAlign: "right",
		color: "rgba(0, 0, 0, 0.4)",
	},
}));

export default function Bag({
	id,
	title,
	subtitle,
	color,
	selectedSize,
	sizes,
	quantity,
	price,
	imageUrl,
	setQuantity,
	removeFromBag,
	url,
}) {
	const classes = useStyles();

	const [size, setSize] = React.useState(selectedSize);

	const onSelectSizeHandler = e => {
		setSize(e.target.value);
	};

	const onSelectQuantityHandler = e => {
		setQuantity(id, +e.target.value);
	};

	const remove = () => {
		removeFromBag(id);
	};

	return (
		<div className={classes.bag}>
			<div className={classes.image}>
				<Link to={url}>
					<img src={"./images" + imageUrl} alt="shoe" />
				</Link>
			</div>
			<div className={classes.info}>
				<Typography variant="subtitle1" component="h2">
					{title}
				</Typography>
				<Typography variant="body1" color="textSecondary" component="h3">
					{subtitle}
				</Typography>
				<Typography variant="body1" color="textSecondary" component="p">
					{color}
				</Typography>

				<FormControl margin="normal" className={classes.formControl}>
					<InputLabel shrink htmlFor="size">
						Size
					</InputLabel>
					<NativeSelect value={size} onChange={onSelectSizeHandler} id="size">
						{sizes.map(item => (
							<option value={item} key={item}>
								{item}
							</option>
						))}
					</NativeSelect>
				</FormControl>
				<FormControl margin="normal" className={classes.formControl}>
					<InputLabel shrink htmlFor="quantity">
						Quantity
					</InputLabel>
					<NativeSelect
						value={quantity > 10 ? 10 : quantity}
						onChange={onSelectQuantityHandler}
						id="quantity"
					>
						{new Array(10).fill(null).map((item, index) => (
							<option key={index} value={index + 1}>
								{index + 1}
							</option>
						))}
					</NativeSelect>
				</FormControl>

				<div className={classes.remove}>
					<Button color="inherit" startIcon={<DeleteIcon />} onClick={remove}>
						Remove
					</Button>
				</div>
			</div>
			<div className={classes.price}>${quantity * price}</div>
		</div>
	);
}
