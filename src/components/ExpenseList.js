import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = (props) => {
    // console.log("object : ", props);
    return (
        <div>
            {props.expenses.map((expense) => (
                // console.log("expense : ", expense)
                <ExpenseListItem {...expense} key={expense.id} />
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    // this function will map whole state object to props. props of expense list, as we are providing it as parameter below.
    // console.log("state : ", state.expenses);
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters,
    };
};

export default connect(mapStateToProps)(ExpenseList); // calling function connect and then doing a another function call inside of this function with parameters as our component.
