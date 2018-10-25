import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./map.scss";

class Map extends Component {
	static propTypes = {
		map: PropTypes.array
	};

	isWall(pos) {
		const { map } = this.props;
		return map[pos.y][pos.x].isWall;
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
										/>
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
	return { map: state.map };
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
