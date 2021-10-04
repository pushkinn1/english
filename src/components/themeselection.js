import React from "react"
import QuestionList from "./questions";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

class ThemeSelection extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Switch>
                    <Route path='/themeSelection'>
                        <ThemesList />
                    </Route>
                    <Route path='/aviation'>
                        <QuestionList theme="aviation" />
                    </Route>
                </Switch>
            </div>
        )
    }
}
/* ! */
class ThemesList extends React.Component {
    render() {
        return (
            <div>Select theme <br />
                <Link to="/aviation">Aviation</Link>
            </div>
        )
    }
}

export default ThemeSelection