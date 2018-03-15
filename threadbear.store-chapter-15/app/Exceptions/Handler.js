"use strict"

class ExceptionHandler {
    async handle(error, { request, response }) {
        if (error.code === "EBADCSRFTOKEN") {
            response.forbidden("Cannot process your request.")
            return
        }

        if (error.name === "HttpException") {
            response.status(error.status).send("not found")
            return
        }
    }

    async report(error, { request }) {
        // write the error to a log
    }
}

module.exports = ExceptionHandler
