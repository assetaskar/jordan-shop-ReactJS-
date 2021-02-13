import React from "react";
import "./style.scss";

import Carousel from "react-elastic-carousel";

export default function CustomCarousel(props) {
	return (
		<Carousel className="carousel">
			{props.children.map((url, index) => (
				<img key={url} src={"../../images" + url} alt={"shoes" + index} className="image" />
			))}
		</Carousel>
	);
}
