// Expense Reducers
const expenseReducerDefaultState = [];

export default (state = expenseReducerDefaultState, action) => {
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
            return state.filter((expense) => expense.id !== action.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                console.log("expense from [reducers/expense.js]", expense.id);
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates,
                    };
                }
                return expense;
            });
        default:
            return state;
    }
};
