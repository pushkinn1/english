import { createServer, Model } from "miragejs";

let server = createServer({
    models: {
        question: Model,
    },

    routes() {
        this.namespace = "api";
        this.get("/questions", (schema, request) => {
            return schema.questions.all()
        });
        this.get("/other", () => {
            alert("!")
        })
        this.get("/branch/:branch", (schema, request) => {
            let branch = request.params.branch;
            return (schema.questions.where({ branch: branch }).models.map(el => el.attrs))
        })
        this.get("/branches", () => {
            return {
                themes: ["Aviation", "Medicine"]
            }
        })
    },

    seeds(server) {
        server.create("question", { id: 1, q: "Who are u?", v: ["Shit", "pig", 'frog'], c: "Shit", branch: "aviation" })
        server.create("question", { id: 2, q: "What is this?", v: ["i", "dont", "know"], c: "know", branch: "aviation" })
        server.create("question", { id: 3, q: "What the f?", v: ["fuck u"], c: "fuck u", branch: "aviation" })
        server.create("question", { q: "Who are u?", v: ["Shit", "pig", 'frog'], c: "Shit", branch: "medicine" })
        server.create("question", { q: "What the f?", v: ["fuck u"], c: "fuck u", branch: "medicine" })
    },
})

export default server