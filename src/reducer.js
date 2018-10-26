import initialState from "./initialState";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_PACMAN_POS":
			return { ...state, pacmanPos: action.value };
		case "REMOVE_DOT": {
			let updatedMap = [...state.map];
			updatedMap[action.value.y][action.value.x].showDot = false;
			return { ...state, map: updatedMap };
		}
		default:
			return state;
	}
};

export default reducer;
