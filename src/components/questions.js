import React from "react";

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

export default QuestionList