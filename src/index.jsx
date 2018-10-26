import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducer";
import Game from "./Components/Game";

const store = createStore(reducer);

render(
	<Provider store={store}>
		<Game />
	</Provider>,
	document.getElementById("app")
);
