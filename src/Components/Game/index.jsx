import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Map from "../Map";

import "./game.scss";

class App extends Component {
	static propTypes = {
		pacmanPos: PropTypes.object,
		map: PropTypes.array,
		updatePos: PropTypes.func,
		removeDot: PropTypes.func
	};

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPress.bind(this));
	}

	handleKeyPress(event) {
		let pos = { ...this.props.pacmanPos };

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

		if (pos !== this.props.pacmanPos && !this.isCollidingWithWall(pos)) {
			this.props.updatePos(pos);

			if (this.isCollidingWithDot(pos)) {
				this.props.removeDot(pos);
			}
		}
	}

	isCollidingWithWall(pos) {
		const { map } = this.props;
		return map[pos.y][pos.x].isWall;
	}

	isCollidingWithDot(pos) {
		const { map } = this.props;
		return map[pos.y][pos.x].showDot;
	}

	render() {
		return <Map />;
	}
}

const mapStateToProps = state => {
	return { pacmanPos: state.pacmanPos, map: state.map };
};

const mapDispatchToProps = dispatch => {
	return {
		updatePos: position =>
			dispatch({ type: "UPDATE_PACMAN_POS", value: position }),
		removeDot: position => dispatch({ type: "REMOVE_DOT", value: position })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
