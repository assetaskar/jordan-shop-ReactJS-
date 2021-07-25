import React from "react";
import { Button, Bag } from "components";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(4),
	},
	sumContainer: {
		borderTop: "1px solid #ccc",
		borderBottom: "1px solid #ccc",
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		marginBottom: theme.spacing(4),
	},
	total: {
		textAlign: "right",
	},
}));

export default function Cart({ bag, ...rest }) {
	const classes = useStyle();

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12}>
					<Typography variant="h6" component="h1" className={classes.title}>
						Bag
					</Typography>

					{bag.length > 0 ? (
						bag.map(item => <Bag {...item} key={item.id} {...rest} />)
					) : (
						<div>There are no items in your bag.</div>
					)}
				</Grid>
				<Grid item md={4} xs={12}>
					<Typography variant="h6" component="h2" className={classes.title}>
						Summary
					</Typography>
					<Grid container spacing={1} className={classes.sumContainer}>
						<Grid item xs>
							<Typography variant="body1" component="h3">
								Total
							</Typography>
						</Grid>
						<Grid item xs={3} className={classes.total}>
							$
							{bag.reduce((acc, cur) => {
								acc += cur.price * cur.quantity;
								return acc;
							}, 0)}
						</Grid>
					</Grid>
					<Button>Checkout</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
