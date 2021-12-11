import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseDashboardPage from "./ExpenseDashboardPage";
import EditExpensePage from "./EditExpensePage";
import AddExpensePage from "./AddExpensePage";
import HelpPage from "./HelpPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={ExpenseDashboardPage} />
                    <Route exact path="/create" component={AddExpensePage} />
                    <Route exact path="/edit/:id" component={EditExpensePage} />
                    <Route exact path="/help" component={HelpPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;
