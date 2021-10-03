import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import server from "../api"

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], finished: false, curr: 0, loaded: false, result: 0 }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }
    componentDidMount() {
        fetch("api/questions")
            .then(res => res.json())
            .then(res => {
                this.setState({ questions: res["questions"], loaded: true })
            })
    }
    next() {
        let checked = document.querySelector('input:checked');
        (checked) ? checked = checked.value : checked = undefined;
        let addition = checked == this.state.questions[this.state.curr]["c"]
        if (this.state.curr == this.state.questions.length - 1) this.setState({ finished: true });
        this.setState(s => {
            return ({ curr: s.curr + 1, result: s.result + addition })
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
                !this.state.finished ? <Question next={this.next} prev={this.prev} question={this.state.questions[this.state.curr]} /> : <Finish theme={this.props.theme} result={this.state.result} />
            )
        else return (
            <div>Loading</div>
        )
    }
}

class Question extends React.Component {
    render() {
        let variants = this.props.question["v"].map(el => {
            return(
                <div key={el}>
                    <input type="radio" value={el} name={el} id={el} />
                    <label htmlFor={el}>{el}</label> 
                </div>
            )
        })
        return (
            <div>
                <h2>{this.props.question["q"]}</h2>
                {variants}
                <button onClick={this.props.prev}>Prev</button>
                <button onClick={this.props.next}>Next</button>
            </div>
        )
    }
}

function Finish(props) {
    return (
        <div>
            <h2>
                You finished theme {props.theme}
            </h2>
            <div>Result: {props.result}</div>
        </div>
    )
}

export default QuestionList