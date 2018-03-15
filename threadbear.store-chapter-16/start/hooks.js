"use strict"

const { hooks } = use("@adonisjs/ignitor")

hooks.after.httpServer(() => {
    const server = use("Server")

    const instance = server.getInstance()
    const socket = use("socket.io")(instance)

    socket.on("connection", connection => {
        console.log("browser connected", connection.id)

        connection.on("disconnect", () => {
            console.log("browser disconnected")
        })

        connection.on("browser message", message => {
            console.log("browser message:", message)
        })

        connection.on("buy", message => {
            connection.emit("bought", message)
        })

        connection.on("check out", async message => {
            const { seller, buyer, token, items } = JSON.parse(message)

            const Database = use("Database")
            const moment = use("moment")

            const timestamps = {
                created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            }

            const orderId = await Database.table("orders").insert({
                buyer_id: seller,
                seller_id: buyer,
                status: "pending",
                token,
                ...timestamps,
            })

            await Database.from("order_items").insert(
                items.map(item => ({
                    order_id: orderId[0],
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    ...timestamps,
                })),
            )

            // for immediate payments...

            const Env = use("Env")
            const Stripe = use("stripe")
            const client = Stripe(Env.get("STRIPE_SECRET"))

            const total = items.reduce((acc, item) => {
                return acc + item.price * item.quantity
            }, 0)

            client.charges.create(
                {
                    amount: total,
                    currency: "usd",
                    description: "Threadbear purchase",
                    source: token,
                },
                (error, charge) => {
                    // ...use this to check if the charge was successful
                },
            )
        })

        connection.emit("server message", "hello browser")
    })

    console.log("set up socket.io")
})

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
