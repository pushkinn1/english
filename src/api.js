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
        server.create("question", { id: 1, q: "Who are u?" })
        server.create("question", { id: 2, q: "What is this?" })
        server.create("question", { id: 3, q: "What the f?" })
    },
})

export default server