import React from "react";
import ThemeSelection from "./components/themeselection";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import './header.css'

class App extends React.Component {
    render() {
        return (
            <Router>
                <header className="header">
                    <div className="wrapper header__wrapper">
                        <div className="header__logo">
                            <Link to="/">Logo</Link>
                        </div>
                        <div className="header__auth">
                            <Link to="/signUp" className="btn auth__btn">
                                <span>Sign up</span>
                            </Link>
                            <Link to="/signIn" className="btn auth__btn">
                                <span>Sign in</span>
                            </Link>
                        </div>
                    </div>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route path="/themeSelection">
                            <ThemeSelection />
                        </Route>
                    </Switch>
                </main>
                <footer className="footer">

                </footer>
            </Router>
        )
    }
}

function Main() {
    return (
        <div>Welcome to our app <Link to="/themeSelection">select theme</Link></div>
    )
}

export default App