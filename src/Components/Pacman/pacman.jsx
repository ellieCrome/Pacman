import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./pacman.scss";

class Pacman extends Component {
	constructor() {
		super();
		this.state = { style: {} };
		this.state.style = this.setStyle(1, 1);
	}

	static propTypes = {
		pacmanPos: PropTypes.object,
		map: PropTypes.array,
		updatePos: PropTypes.func,
		removeCoin: PropTypes.func
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

			if(this.isCollidingWithCoin(pos)) {
				this.props.removeCoin(pos);
			}

			const style = this.setStyle(pos.x, pos.y);
			this.setState({ style: style });
		}
	}

	isCollidingWithWall(pos) {
		const { map } = this.props;
		return map[pos.y][pos.x].isWall;
	}

	isCollidingWithCoin(pos) {
		const { map } = this.props;
		return map[pos.y][pos.x].showCoin;
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

const mapStateToProps = state => {
	return { pacmanPos: state.pacmanPos, map: state.map };
};

const mapDispatchToProps = dispatch => {
	return {
		updatePos: position =>
			dispatch({ type: "UPDATE_PACMAN_POS", value: position }),
		removeCoin: position =>
			dispatch({ type: "REMOVE_COIN", value: position })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pacman);
