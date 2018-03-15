"use strict"

const { LogicalException } = require("@adonisjs/generic-exceptions")

class ProfileMissingException extends LogicalException {
    async handle(error, { response, view }) {
        const content = view.render("oops", {
            type: "PROFILE_MISSING",
        })

        response.status(404).send(content)

        return
    }
}

module.exports = ProfileMissingException
