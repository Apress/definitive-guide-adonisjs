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
})
