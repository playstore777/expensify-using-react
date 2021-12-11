import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
    const style = {
        border: "1px solid black",
        margin: "10px",
        textAlign: "center",
    };
    return (
        <div style={style}>
            <h1>{description}</h1>
            <h3>amount : {amount}</h3>
            <h3>createdAt :{createdAt}</h3>
            <Link to={`/edit/${id}`}>Edit</Link>
        </div>
    );
};

export default ExpenseListItem;
