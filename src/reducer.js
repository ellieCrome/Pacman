import initialState from "./initialState";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_PACMAN_POS":
			return { ...state, pacmanPos: action.value };
		case "REMOVE_COIN": {
			let updatedMap = [...state.map];
			updatedMap[action.value.y][action.value.x].showCoin = false;
			return { ...state, map: updatedMap };
		}
		default:
			return state;
	}
};

export default reducer;
