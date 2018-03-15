"use strict"

const Customer = use("App/Models/Customer")

const key = "customer"
const redirectTo = "login"

class Auth {
    async handle({ request, session, response }, next) {
        const id = session.get(key)

        if (!id) {
            return response.route(redirectTo)
        }

        const customer = await Customer.find(id)

        if (!customer) {
            return response.route(redirectTo)
        }

        request.customer = customer

        await next()
    }
}

module.exports = Auth
