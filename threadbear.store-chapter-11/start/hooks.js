const { hooks } = require("@adonisjs/ignitor")

hooks.after.providersBooted(() => {
    const parser = use("js2xmlparser")
    const Response = use("Adonis/Src/Response")

    Response.macro("xml", function(data, root = "root") {
        this.type("application/xml")
        this.send(parser.parse(root, data))
    })

    Response.macro("for", function(params, handlers) {
        if (params.format === ".xml") {
            const handler = handlers.xml
            const data = handler()

            return this.xml(...data)
        }

        if (params.format === ".json") {
            const handler = handlers.json
            const data = handler()

            return this.json(...data)
        }

        return (handlers.default || function() {})()
    })

    const Validator = use("Validator")
    const Database = use("Database")

    const existsFn = async (data, field, message, args, get) => {
        const value = get(data, field)

        if (!value) {
            return
        }

        const [table, column] = args

        const row = await Database.table(table)
            .where(column, value)
            .first()

        if (!row) {
            throw message
        }
    }

    Validator.extend("exists", existsFn)

    const Exception = use("Exception")

    // Exception.handle("HttpException", async (error, { response, session }) => {
    //     // respond to the 404 error
    //     return
    // })

    Exception.handle(
        "ValidationException",
        async (error, { response, session }) => {
            session.withErrors(error.messages).flashAll()
            await session.commit()

            return response.redirect("back")
        },
    )
})
