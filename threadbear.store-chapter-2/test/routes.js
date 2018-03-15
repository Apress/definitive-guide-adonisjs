const assert = require("assert")
const http = require("http")

require("dotenv").config()

const shouldBeOk = (method, path, done) => {
    http.request({
        host: process.env.HOST,
        port: process.env.PORT,
        method,
        path,
    }, (response) => {
        assert.equal(200, response.statusCode)
        done()
    }).end()
}

const shouldHaveMessage = (method, path, message, done) => {
    http.request({
        host: process.env.HOST,
        port: process.env.PORT,
        method,
        path,
    }, (response) => {
        let data = ""

        response.on("data", (chunk) => {
            data += chunk
        });

        response.on("end", () => {
            assert.equal(message, data)
            done()
        })
    }).end()
}

describe("GET /login", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/login",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/login",
            "GET /login",
            done,
        )
    })
})

describe("POST /login", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "POST",
            "/login",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "POST",
            "/login",
            "POST /login",
            done,
        )
    })
})

describe("PUT /logout", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "PUT",
            "/logout",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "PUT",
            "/logout",
            "PUT /logout",
            done,
        )
    })
})

describe("GET /register", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/register",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/register",
            "GET /register",
            done,
        )
    })
})

describe("POST /register", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "POST",
            "/register",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "POST",
            "/register",
            "POST /register",
            done,
        )
    })
})

describe("GET /forgot-password", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/forgot-password",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/forgot-password",
            "GET /forgot-password",
            done,
        )
    })
})

describe("POST /forgot-password", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "POST",
            "/forgot-password",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "POST",
            "/forgot-password",
            "POST /forgot-password",
            done,
        )
    })
})

describe("GET /reset-password", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/reset-password/token123",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/reset-password/token123",
            "GET /reset-password token123",
            done,
        )
    })
})

describe("POST /reset-password", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "POST",
            "/reset-password/token123",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "POST",
            "/reset-password/token123",
            "POST /reset-password token123",
            done,
        )
    })
})

describe("GET /:customer", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/assertchris",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/assertchris",
            "GET /:customer assertchris",
            done,
        )
    })
})

describe("PUT /:customer", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "PUT",
            "/assertchris",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "PUT",
            "/assertchris",
            "PUT /:customer assertchris",
            done,
        )
    })
})

describe("DELETE /:customer", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "DELETE",
            "/assertchris",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "DELETE",
            "/assertchris",
            "DELETE /:customer assertchris",
            done,
        )
    })
})

describe("GET /:customer/products", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/assertchris/products",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/assertchris/products",
            "GET /:customer/products assertchris",
            done,
        )
    })
})

describe("POST /:customer/products", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "POST",
            "/assertchris/products",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "POST",
            "/assertchris/products",
            "POST /:customer/products assertchris",
            done,
        )
    })
})

describe("GET /:customer/:product", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "GET",
            "/assertchris/teddy",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "GET",
            "/assertchris/teddy",
            "GET /:customer/:product assertchris teddy",
            done,
        )
    })
})

describe("PUT /:customer/:product", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "PUT",
            "/assertchris/teddy",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "PUT",
            "/assertchris/teddy",
            "PUT /:customer/:product assertchris teddy",
            done,
        )
    })
})

describe("DELETE /:customer/:product", () => {
    it("should have the correct status (200)", (done) => {
        shouldBeOk(
            "DELETE",
            "/assertchris/teddy",
            done,
        )
    })

    it("should have the correct message", (done) => {
        shouldHaveMessage(
            "DELETE",
            "/assertchris/teddy",
            "DELETE /:customer/:product assertchris teddy",
            done,
        )
    })
})
