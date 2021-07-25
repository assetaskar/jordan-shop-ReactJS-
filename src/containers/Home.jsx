import React from "react";
import { Card } from "components";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles(theme => ({
	toolbar: {
		justifyContent: "flex-end",
		marginBottom: 24,
	},
	formControl: {
		minWidth: 150,
	},
	cardsWrapper: {
		padding: "0 24px",
	},
}));

function Home(props) {
	const history = useHistory();
	const classes = useStyles();

	const queryString = history.location.search;
	const params = new URLSearchParams(queryString);

	const initialSort = params.get("sort") || "newest";
	const [sort, setSort] = React.useState(initialSort);

	function changeHandler(e) {
		setSort(e.target.value);

		history.push({
			search: `?sort=${e.target.value}`,
		});
	}

	function sortData(a, b) {
		if (sort === "priceDesc") {
			return b.colorway[0].price - a.colorway[0].price;
		} else if (sort === "priceAsc") {
			return a.colorway[0].price - b.colorway[0].price;
		}
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	}

	const data = props.db.sort(sortData);

	return (
		<Box component="main">
			<Toolbar className={classes.toolbar}>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="select">Sort by</InputLabel>
					<NativeSelect id="select" value={sort} onChange={changeHandler}>
						<option value="newest">Newest</option>
						<option value="priceDesc">Price: High-Low</option>
						<option value="priceAsc">Price: Low-High</option>
					</NativeSelect>
				</FormControl>
			</Toolbar>

			<div className={classes.cardsWrapper}>
				<Grid container spacing={2}>
					{data.map(item => (
						<Card key={item.id} item={item} />
					))}
				</Grid>
			</div>
		</Box>
	);
}

export default Home;
