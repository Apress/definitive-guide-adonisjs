const assert = require("assert")
const http = require("http")
const querystring = require("querystring")

require("dotenv").config()

const shouldBeOk = (method, path, done) => {
    http
        .request(
            {
                host: process.env.HOST,
                port: process.env.PORT,
                method,
                path,
            },
            response => {
                assert.equal(200, response.statusCode)
                done()
            },
        )
        .end()
}

const shouldHaveMessage = (method, path, message, done) => {
    http
        .request(
            {
                host: process.env.HOST,
                port: process.env.PORT,
                method,
                path,
            },
            response => {
                let data = ""

                response.on("data", chunk => {
                    data += chunk
                })

                response.on("end", () => {
                    assert.equal(message, data)
                    done()
                })
            },
        )
        .end()
}

const request = (method, path, callback, options = {}) => {
    let data = ""

    const methods = ["POST", "PUT", "PATCH"]

    if (options.data && methods.indexOf(method) > -1) {
        data = querystring.stringify(options.data)
    }

    const parameters = Object.assign(
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(data),
            },
            host: process.env.HOST,
            port: process.env.PORT,
            method,
            path,
        },
        options,
    )

    const request = http.request(parameters, response => {
        let buffer = ""

        response.on("data", data => {
            buffer += data
        })

        response.on("end", () => {
            callback(buffer, response)
        })
    })

    if (data) {
        request.write(data)
    }

    request.end()
}

module.exports = {
    request,
    shouldBeOk,
    shouldHaveMessage,
}
