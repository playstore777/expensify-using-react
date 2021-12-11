import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";
import { connect } from "react-redux";

const AddExpensePage = (props) => (
    <ExpenseForm
        onSubmit={(expense) => {
            console.log(props);
            props.dispatch(addExpense(expense));
            props.history.push("/");
        }}
    />
);

export default connect()(AddExpensePage);
