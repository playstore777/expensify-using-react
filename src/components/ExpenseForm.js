import { Component } from "react";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export default class ExpenseForm extends Component {
    constructor(props) {
        super(props);
        console.log(props.expense);
        this.state = {
            description: this.props.expense
                ? this.props.expense.description
                : "",
            note: this.props.expense ? this.props.expense.note : "",
            amount: this.props.expense
                ? (this.props.expense.amount / 100).toString()
                : 0,
            createdAt: this.props.expense
                ? moment(this.props.expense.createdAt)
                : moment(),
            calendarFocused: false,
            error: "",
        };
    }

    onDateChange = (createdAt) => {
        if (createdAt) this.setState({ createdAt });
    };

    onFocusChange = ({ focused }) => {
        this.setState({ calendarFocused: focused });
    };

    onChange = (e, key) => {
        switch (key) {
            case "description":
                this.setState({
                    description: e.target.value,
                });
                break;
            case "note":
                this.setState({
                    note: e.target.value,
                });
                break;
            case "amount":
                if (
                    !e.target.value ||
                    e.target.value.match(/^\d*(\.\d{0,2})?$/)
                )
                    this.setState({
                        amount: e.target.value,
                    });
                break;
        }
    };

    onsubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState({
                error: "Please provide a description and amount",
            });
            console.log(this.state.error);
        } else {
            this.setState({
                error: "",
            });
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, // since we are working with cents
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            });
        }
    };

    render() {
        return (
            <div>
                {this.state.error && (
                    <p style={{ color: "red" }}>{this.state.error}</p>
                )}
                <form onSubmit={this.onsubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={(e) => this.onChange(e, "description")}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={(e) => this.onChange(e, "amount")}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        type="text"
                        placeholder="Add a note for your expense(optional)"
                        onChange={(e) => this.onChange(e, "note")}
                    />
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}
