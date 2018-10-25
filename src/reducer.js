import initialState from "./initialState";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_PACMAN_POS":
			var newState = { ...state, pacmanPos: action.value };
			return newState;
		default:
			return state;
	}
};

export default reducer;
