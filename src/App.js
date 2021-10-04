import React from "react";
import ThemeSelection from "./components/themeselection";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect,
} from "react-router-dom";
import './header.css'
import main_img from "./imgs/main_img.svg"

class App extends React.Component {
    render() {
        return (
            <Router>
                <header className="header">
                    <div className="wrapper header__wrapper">
                        <div className="header__logo">
                            <Link to="/main">Logo</Link>
                        </div>
                        <nav className="header__nav">
                            <ul>
                                <li><NavLink activeClassName="header__li-selected" to="/main">Главная</NavLink></li>
                                <li><NavLink activeClassName="header__li-selected" to="/themeSelection">Тест</NavLink></li>
                                <li><NavLink activeClassName="header__li-selected" to="/aboutUs">О нас</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/main" />
                        </Route>
                        <Route path="/main">
                            <Main />
                        </Route>
                        <Route path="/themeSelection">
                            <ThemeSelection />
                        </Route>
                        <Route path="/aboutUs">
                            <AboutUs />
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
        <div className="wrapper main__wrapper">
            <div>Welcome to our app <Link to="/themeSelection">select theme</Link></div>
            <img src={main_img} className="main__img" />
        </div>
    )
}

function AboutUs() {
    return (
        <div className="wrapper">
            <div>About us</div>
        </div>
    )
}

export default App
