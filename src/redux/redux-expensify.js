import { createStore, combineReducers } from "redux";
import { v1 as uuid } from "uuid"; // earlier uuid from uuid would work, but now, it is removed.

//Add Expense
const addExpense = ({
    description = "",
    note = "",
    amount = 0,
    createdAt = 0,
}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(), // generates random & unique id, we installed it using npm i uuid.
        description,
        note,
        amount,
        createdAt,
    },
});

// Remove Expense
const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id,
});

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates,
});

// Expense Reducers
const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            // return state.concat(action.expense); // we don't use push as it will
            //change the 'state', instead we use concat as it will give us
            //a different array with this value.

            return [...state, action.expense]; //action.expense will be added in the end
        // we can replace their position to change their position(yes I know you are confused!)
        // [actioni.expense, ...state] will put action.expense first and rest after it!
        // (that means, lastest expense will be first).
        case "REMOVE_EXPENSE":
            return state.filter((id) => id !== action.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates,
                    };
                }
            });
        default:
            return state;
    }
};

// Changes the Filter.text
const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text,
});

// Change the Filter.sortBy to amount.
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
});

// Change the Filter.sortBy to date.
const sortByDate = () => ({
    type: "SORT_BY_DATE",
});

const setStartDate = (startDate) => ({
    // if startDate not given, then it should be undefined(but not zero)
    type: "SET_START_DATE",
    startDate,
});

const setEndDate = (endDate) => ({
    // if endDate not given, then it should be undefined(but not zero)
    type: "SET_END_DATE",
    endDate,
});

// Filter Reducer
const filterReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return { ...state, text: action.text };
        case "SORT_BY_AMOUNT":
            return { ...state, sortBy: "amount" };
        case "SORT_BY_DATE":
            return { ...state, sortBy: "date" };
        case "SET_START_DATE":
            return { ...state, startDate: action.startDate };
        case "SET_END_DATE":
            return { ...state, endDate: action.endDate };
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses
        .filter((expense) => {
            const startDateMatch =
                typeof startDate !== "number" ||
                expenses.createdAt >= startDate;
            const endDateMatch =
                typeof endDate !== "number" || expenses.createdAt <= endDate;
            const textMatch = expense.description
                .toLowerCase()
                .includes(text.toLowerCase());

            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) =>
            sortBy === "date"
                ? a.createdAt < b.createdAt
                    ? 1
                    : -1
                : a.amount < b.amount
                ? 1
                : -1
        );
};

// store creation.
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filter: filterReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpense = getVisibleExpenses(state.expenses, state.filters);
    console.log(store.getState());
});

// expenseOne will have the object of state, or say store.dispatch will return object.
// where you can find the id of this expense. i.e., expenseOne.expense.id -> gives id.
const expenseOne = store.dispatch(
    addExpense({
        description: "Rent",
        amount: 100,
    })
);

store.dispatch(setTextFilter("rent"));

store.dispatch(sortByAmount()); //amount
store.dispatch(sortByDate()); //date

// console.log(store.getState()); // prints the state to the console for once.

// console.log(store.subscribe()); // prints the state whenever there is a change in the state.

// demo of how complex the state is.
const demoState = {
    expenses: [
        {
            id: "safdssaffsd",
            description: "House Rent",
            note: "This is the last payment for this address",
            amount: 54500,
            createdAt: 0,
        },
    ],
    filters: {
        text: "",
        sortBy: "date", // date or amount,
        startDate: undefined,
        endDate: undefined,
    },
};

// console.log({
//     ...demoState,
//     dummy: "hehehe",
//     expenses: [{ ...demoState.expenses[0], createdAt: 1 }],
// });
