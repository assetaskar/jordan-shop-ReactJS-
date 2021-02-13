import React from "react";
import { Header, Home, Item, Cart } from "./containers/";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			db: [],
			bag: [],
		};

		this.addToBag = this.addToBag.bind(this);
		this.setQuantity = this.setQuantity.bind(this);
		this.removeFromBag = this.removeFromBag.bind(this);
	}

	componentDidMount() {
		fetch("https://jordan-e2019-default-rtdb.firebaseio.com/jordan.json")
			.then(response => response.json())
			.then(data => this.setState({ db: data }))
			.catch(error => console.log(error));
	}

	addToBag(product) {
		const bag = this.state.bag.slice();
		const include = bag.findIndex(item => Object.values(item).includes(product.id));
		if (~include) {
			bag[include].quantity += 1;
			this.setState({ bag });
		} else {
			bag.push(product);
			this.setState({ bag });
		}
	}

	removeFromBag(id) {
		const bag = this.state.bag.filter(item => item.id !== id);
		this.setState({ bag });
	}

	setQuantity(id, value) {
		const bag = this.state.bag.slice();
		const index = bag.findIndex(item => Object.values(item).includes(id));
		bag[index].quantity = value;
		this.setState({ bag });
	}

	render() {
		const all = this.state.db;
		const men = this.state.db.filter(item => item.group === "men");
		const women = this.state.db.filter(item => item.group === "women");

		return (
			<Router>
				<CssBaseline />
				<Header length={this.state.bag.length} />
				<Switch>
					<Route exact path="/">
						<Home db={all} />
					</Route>

					<Route exact path="/men">
						<Home db={men} />
					</Route>

					<Route exact path="/women">
						<Home db={women} />
					</Route>

					<Route exact path="/cart">
						<Cart
							bag={this.state.bag}
							setQuantity={this.setQuantity}
							removeFromBag={this.removeFromBag}
						/>
					</Route>

					<Route path="/:id/:name">
						<Item db={this.state.db} addToBag={this.addToBag} />
					</Route>

					<Redirect to="/" />
				</Switch>
			</Router>
		);
	}
}

export default App;
