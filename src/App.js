import React from "react";
import { createServer } from "miragejs";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import './header.css'

let server = createServer();
server.namespace = "api";
server.get("/aviation", () => {
    return (
        [8768686, 765765756, 5325365]
    )
})

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
                        <Route path="/signIn">
                            <SignIn />
                        </Route>
                        <Route path="/signUp">
                            <SignUp />
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

class ThemeSelection extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/themeSelection'>
                            <ThemesList />
                        </Route>
                        <Route path='/aviation'>
                            <QuestionList theme="aviation" />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

function ThemesList() {
    return (
        <div>Select theme <br />
            <Link to="/aviation">Aviation</Link>
        </div>
    )
}

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], finished: false, curr: 0 }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    componentDidMount() {
        fetch("api/" + this.props.theme)
            .then(res => res.json())
            .then(res => this.setState({
                questions: res
            }))
    }
    next() {
        if (this.state.curr == this.state.questions.length - 1) this.setState({ finished: true });
        this.setState(s => {
            return ({ curr: s.curr + 1 })
        })
    }
    prev() {
        if (this.state.curr == 0) {
            alert("This is the first question");
            return 0;
        }
        this.setState(s => {
            return ({ curr: s.curr - 1 })
        })
    }
    render() {
        return (
            !this.state.finished ? <Question next={this.next} prev={this.prev} id={this.state.questions[this.state.curr]} /> : <Finish theme={this.props.theme} />
        )
    }
}

class Question extends React.Component {
    render() {
        return (
            <div>
                <h2>Question id {this.props.id}</h2>
                <button onClick={this.props.prev}>Prev</button>
                <button onClick={this.props.next}>Next</button>
            </div>
        )
    }
}

function Finish(props) {
    return (
        <h2>
            You finished theme {props.theme}
        </h2>
    )
}

function SignIn() {
    return (
        <div>Sign in</div>
    )
}
function SignUp() {
    return (
        <div>Sign Up</div>
    )
}

export default App