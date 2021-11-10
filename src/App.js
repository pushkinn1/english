import React from "react";
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
import main__img2 from "./imgs/main__img2.svg"
import server from "./api"

/* class ThemeSelection extends React.Component {
    render() {
        return (
            <div className="wrapper main__wrapper">
                <Switch>

                    <Route path='/themeSelection'>
                        <ThemesList />
                    </Route>

                    <Route path="/aviation">
                        <QuestionList theme="aviation" />
                    </Route>

                </Switch>
            </div>
        )
    }
}
 */
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
                        <Route path="/aboutUs">
                            <AboutUs />
                        </Route>
                        <Route path='/themeSelection'>
                            <ThemesList />
                        </Route>
                        <Route path='/aviation'>
                            <QuestionList theme="aviation" />
                        </Route>
                        <Route path='/medicine'>
                            <QuestionList theme="medicine" />
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
            <div className="main__look">
                <h2 className="main__title">Проверьте свой уровень английского</h2>
                <p className="main__subtitle">
                    Бесплатный комплексный тест, который поможет определить твои знания языка в разных отраслях
                </p>
                <Link to="/themeSelection">
                    <div className="btn main__btn">
                        <span>
                            Начать тест
                        </span>
                    </div>
                </Link>
            </div>
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

class ThemesList extends React.Component {
    render() {
        return (
            <div className="main__wrapper wrapper">
                <div className="main__look">
                    <div className="main__title main__title-smaller">
                        Выберите тему
                    </div>
                    <Link className="themes__link" to="/aviation">Aviation</Link>
                    <Link className="themes__link" to="/medicine">Medicine</Link>
                </div>
                <img src={main__img2} />
            </div>

        )
    }
}

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], finished: false, curr: 0, loaded: false, answers: [] }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    componentDidMount() {
        fetch("api/branch/" + this.props.theme)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({ questions: res, loaded: true, answers: Array(res.length).fill(null) })
                this.getCorrectAnswers = this.getCorrectAnswers.bind(this);
            })
    }
    getCorrectAnswers() {
        let res = [];
        for (let i = 0; i < this.state.questions.length; i++)
            res.push(this.state.questions[i]["c"]);
        return res;
    }
    next() {
        let checked = document.querySelector('input:checked');
        if (this.state.answers[this.state.curr] == null)
            (checked) ? checked = checked.value : checked = null;
        else
            checked = this.state.answers[this.state.curr];
        let newAnswers = this.state.answers;
        newAnswers[this.state.curr] = checked;
        if (this.state.curr == this.state.questions.length - 1) this.setState({ finished: true });
        this.setState(s => {
            return ({ curr: s.curr + 1, answers: newAnswers })
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
        if (this.state.loaded)
            return (
                !this.state.finished ? <Question
                    next={this.next} prev={this.prev} question={this.state.questions[this.state.curr]} number={this.state.curr} /> :
                    <Finish theme={this.props.theme} answers={this.state.answers} correctAnswers={this.getCorrectAnswers()} />
            )
        else return (
            <div className="wrapper">Loading</div>
        )
    }
}

class Question extends React.Component {
    render() {
        let variants = this.props.question["v"].map(el => {
            return (
                <label key={el} htmlFor={el}>
                    <div className="question__variant" key={el}>
                        <span>
                            <input type="radio" value={el} name={this.props.number} id={el} />
                            {el}
                        </span>
                    </div>
                </label>
            )
        })
        return (
            <div className="wrapper question__wrapper">
                <h2 className="question__title"><span className="question__number">{this.props.number + 1}</span> {this.props.question["q"]}</h2>
                {variants}
                <div className="question__arrows">
                    <div className="question__btn question__btn-bk" onClick={this.props.prev}></div>
                    <div className="question__btn question__btn-fw" onClick={this.props.next}></div>
                </div>
            </div>
        )
    }
}

function Finish(props) {
    let result = 0;
    for (let i = 0; i < props.answers.length; i++)
        if (props.answers[i] == props.correctAnswers[i])
            result++;
    return (
        <div className="wrapper">
            <h2>
                You finished theme {props.theme}
            </h2>
            <div>Result: {result}</div>
            <Link to="/main">Return to main</Link>
        </div>
    )
}


export default App
