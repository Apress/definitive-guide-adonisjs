"use strict"

const Server = use("Server")

const globalMiddleware = [
    "Adonis/Middleware/BodyParser",
    "App/Middleware/CurrencySelector",
    "Adonis/Middleware/Session",
    "Adonis/Middleware/Shield",
]

const namedMiddleware = {
    auth: "App/Middleware/Auth",
}

Server.registerGlobal(globalMiddleware)
    .registerNamed(namedMiddleware)
    .use(["Adonis/Middleware/Static"])
