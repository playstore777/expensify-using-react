import { v1 as uuid } from "uuid";

//Add Expense
export const addExpense = ({
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
export const removeExpense = ({ id } = {}) => {
    console.log("here");
    return {
        type: "REMOVE_EXPENSE",
        id,
    };
};

// Edit Expense
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates,
});
