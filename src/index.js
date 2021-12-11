import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
// import { setTextFilter } from "./actions/filters";
// import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();

// console.log("store : ", store);

// store.subscribe(() => console.log(store.getState()));

store.dispatch(
    addExpense({
        description: "Water bill",
        amount: 4500,
    })
);

store.dispatch(
    addExpense({
        description: "Gas bill",
    })
);

// store.dispatch(setTextFilter("bill"));

// const state = store.getState();
// console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
