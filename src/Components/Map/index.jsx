import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dot from "../Dot";
import Pacman from "../Pacman";
import "./map.scss";

class Map extends Component {
	static propTypes = {
		map: PropTypes.array,
		pacmanPos: PropTypes.object
	};

	isWall(pos) {
		const { map } = this.props;
		return map[pos.y][pos.x].isWall;
	}

	showPacman(x, y) {
		const { pacmanPos } = this.props;


		return x == pacmanPos.x && y == pacmanPos.y;
	}

	render() {
		const { map } = this.props;

		return (
			<table className="map">
				<tbody>
					{map.map((row, rowIndex) => {
						return (
							<tr className="row" key={"row-" + rowIndex}>
								{row.map((cell, cellIndex) => {
									let classes = "cell ";
									classes += cell.isWall ? "blue" : "black";
									return (
										<td
											className={classes}
											key={"cell-" + cellIndex}
										>
											{this.showPacman(
												cellIndex,
												rowIndex
											) && <Pacman />}
											{!cell.isWall &&
												cell.showDot && <Dot />}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = state => {
	return { map: state.map, pacmanPos: state.pacmanPos };
};

const mapDispatchToProps = dispatch => {
	return {
		updateMap: () => dispatch({ type: "UPDATE_MAP" })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Map);
