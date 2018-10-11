import React, { Component } from "react";
import "./pacman.scss";

class Pacman extends Component {
	constructor() {
		super();

		this.state = { style: {} };

		this.pos = { x: 1, y: 1 };

		this.state.style = this.setStyle(this.pos.x, this.pos.y);
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
			this.pos = pos;

			const style = this.setStyle(pos.x, pos.y);

			this.setState({ style: style });
		}
	}

	setStyle(posX, posY) {
		return {
			top: 11 + posY * 29,
			left: 11 + posX * 29
		};
	}

	render() {
		return <div className="pacman" style={this.state.style} />;
	}
}

export default Pacman;
