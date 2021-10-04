import { createServer, Model } from "miragejs";

let server = createServer({
    models: {
        question: Model,
        id: Model
    },

    routes() {
        this.namespace = "api";
        this.get("/questions", (schema, request) => {
            return schema.questions.all()
        });
    },

    seeds(server) {
        server.create("question", { id: 1, q: "Who are u?", v: ["Shit", "pig", 'frog'], c: "Shit" })
        server.create("question", { id: 2, q: "What is this?" , v: ["i", "dont", "know"], c: "know"})
        server.create("question", { id: 3, q: "What the f?", v: ["fuck u"], c: "fuck u" })
    },
})

export default server