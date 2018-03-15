"use strict"

const { validateAll } = use("Validator")
const { ValidationException } = require("@adonisjs/validator/src/Exceptions")

class Controller {
    showRequestParameters({ request, response }) {
        response.json(request.all())
    }

    async validate(request, rules, messages) {
        const validation = await validateAll(request.all(), rules, messages)

        if (validation.fails()) {
            // session.withErrors(validation.messages()).flashAll()
            // return response.redirect("back")

            throw ValidationException.validationFailed(validation.messages())
        }
    }
}

module.exports = Controller
