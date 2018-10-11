import React, { Component } from "react";
import "./pacman.scss";

class Pacman extends Component {
	constructor() {
		super();

		this.state = { style: {} };

		this.pos = { x: 1, y: 1 };

		this.state.style = {
			top: 40,
			left: 40
		};
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPress.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress.bind(this));
	}

	handleKeyPress(event) {
		let pos = JSON.parse(JSON.stringify(this.pos));

		switch (event.key) {
			case "ArrowUp":
			case "W":
				pos.y--;
				break;
			case "ArrowDown":
			case "S":
				pos.y++;
				break;
			case "ArrowLeft":
			case "A":
				pos.x--;
				break;
			case "ArrowRight":
			case "D":
				pos.x++;
				break;
			default:
		}

		if (pos !== this.pos) {
			this.setPacmanLocation(pos);;
		}
	}

	setPacmanLocation(position) {
		this.pos = position;

		const style = {
			top: 11 + this.pos.y * 29,
			left: 11 + this.pos.x * 29
		};

		this.setState({ style: style });
	}

	render() {
		return <div className="pacman" style={this.state.style} />;
	}
}

export default Pacman;
