import { NavLink } from "react-router-dom";
import "../styles/base.css";

const Header = () => (
    <div>
        <h1>Expensify</h1>
        <NavLink exact={true} activeClassName="is-active " to="/">
            Dashboard
        </NavLink>
        <NavLink exact={true} activeClassName="is-active " to="/create">
            Create Expense
        </NavLink>
        <NavLink exact={true} activeClassName="is-active " to="/edit">
            Edit Expense
        </NavLink>
        <NavLink exact={true} activeClassName="is-active " to="/help">
            Help
        </NavLink>
    </div>
);

export default Header;
