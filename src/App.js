import React from "react";
import server from "./api"

class App extends React.Component {
    componentDidMount() {
        fetch("api/questions")
            .then(r => r.json())
            .then(r => console.log(r["questions"]))
    }
    render() {
        return (
            <div>Hello test</div>
        )
    }
}

export default App