const assert = require("assert")
const http = require("http")
const cheerio = require("cheerio")

const { request, shouldBeOk, shouldHaveMessage } = require("./helpers")

describe("GET /login", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/login", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage("GET", "/login", "GET /login", done)
    // })

    it("should have the correct markup", done => {
        request("GET", "/login", markup => {
            const find = cheerio.load(markup)

            assert.equal(find("h1").text(), "Login")
            assert.equal(find("input[name='email']").length, 1)
            assert.equal(find("input[name='password']").length, 1)

            done()
        })
    })
})

describe("POST /login", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("POST", "/login", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage("POST", "/login", "POST /login", done)
    })
})

describe("PUT /logout", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("PUT", "/logout", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage("PUT", "/logout", "PUT /logout", done)
    })
})

describe("GET /register", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/register", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage("GET", "/register", "GET /register", done)
    // })

    it("should have the correct markup", done => {
        request("GET", "/register", markup => {
            const find = cheerio.load(markup)

            assert.equal(find("h1").text(), "Register")
            assert.equal(find("input[name='email']").length, 1)
            assert.equal(find("input[name='password']").length, 1)
            assert.equal(find("input[name='confirm-password']").length, 1)

            done()
        })
    })
})

describe("POST /register", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("POST", "/register", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage("POST", "/register", "POST /register", done)
    // })

    it("should have the correct json", done => {
        request(
            "POST",
            "/register",
            json => {
                const data = JSON.parse(json)

                assert.equal(data["email"], "foo@bar.baz")
                assert.equal(data["password"], "bar")

                done()
            },
            {
                data: {
                    email: "foo@bar.baz",
                    password: "bar",
                },
            },
        )
    })
})

describe("GET /forgot-password", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/forgot-password", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage(
    //         "GET",
    //         "/forgot-password",
    //         "GET /forgot-password",
    //         done,
    //     )
    // })

    it("should have the correct markup", done => {
        request("GET", "/forgot-password", markup => {
            const find = cheerio.load(markup)

            assert.equal(find("h1").text(), "Forgot password")
            assert.equal(find("input[name='email']").length, 1)

            done()
        })
    })
})

describe("POST /forgot-password", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("POST", "/forgot-password", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage(
    //         "POST",
    //         "/forgot-password",
    //         "POST /forgot-password",
    //         done,
    //     )
    // })

    it("should have the correct json", done => {
        request(
            "POST",
            "/forgot-password",
            json => {
                const data = JSON.parse(json)

                assert.equal(data["email"], "foo@bar.baz")

                done()
            },
            {
                data: {
                    email: "foo@bar.baz",
                },
            },
        )
    })
})

describe("GET /reset-password", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/reset-password/token123", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage(
    //         "GET",
    //         "/reset-password/token123",
    //         "GET /reset-password token123",
    //         done,
    //     )
    // })

    it("should have the correct markup", done => {
        request("GET", "/reset-password/token123", markup => {
            const find = cheerio.load(markup)

            assert.equal(find("h1").text(), "Reset password")
            assert.equal(find("input[name='password']").length, 1)
            assert.equal(find("input[name='confirm-password']").length, 1)

            done()
        })
    })
})

describe("PATCH /reset-password", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("PATCH", "/reset-password/token123", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage(
    //         "PATCH",
    //         "/reset-password/token123",
    //         "PATCH /reset-password token123",
    //         done,
    //     )
    // })

    it("should have the correct json", done => {
        request(
            "PATCH",
            "/reset-password/token123",
            json => {
                const data = JSON.parse(json)

                assert.equal(data["password"], "bar")

                done()
            },
            {
                data: {
                    password: "bar",
                },
            },
        )
    })
})

describe("GET /:customer", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/assertchris", done)
    })

    // it("should have the correct message", done => {
    //     shouldHaveMessage(
    //         "GET",
    //         "/assertchris",
    //         "GET /:customer assertchris",
    //         done,
    //     )
    // })

    it("should have the correct markup", done => {
        request("GET", "/chris", markup => {
            const find = cheerio.load(markup)

            assert.equal(find("h1").text(), "Hi, Chris")

            done()
        })
    })
})

describe("PUT /:customer", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("PUT", "/assertchris", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "PUT",
            "/assertchris",
            "PUT /:customer assertchris",
            done,
        )
    })
})

describe("DELETE /:customer", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("DELETE", "/assertchris", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "DELETE",
            "/assertchris",
            "DELETE /:customer assertchris",
            done,
        )
    })
})

describe("GET /:customer/products", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/assertchris/products", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "GET",
            "/assertchris/products",
            "GET /:customer/products assertchris",
            done,
        )
    })
})

describe("POST /:customer/products", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("POST", "/assertchris/products", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "POST",
            "/assertchris/products",
            "POST /:customer/products assertchris",
            done,
        )
    })
})

describe("GET /:customer/:product", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("GET", "/assertchris/teddy", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "GET",
            "/assertchris/teddy",
            "GET /:customer/:product assertchris teddy",
            done,
        )
    })
})

describe("PUT /:customer/:product", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("PUT", "/assertchris/teddy", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "PUT",
            "/assertchris/teddy",
            "PUT /:customer/:product assertchris teddy",
            done,
        )
    })
})

describe("DELETE /:customer/:product", () => {
    it("should have the correct status (200)", done => {
        shouldBeOk("DELETE", "/assertchris/teddy", done)
    })

    it("should have the correct message", done => {
        shouldHaveMessage(
            "DELETE",
            "/assertchris/teddy",
            "DELETE /:customer/:product assertchris teddy",
            done,
        )
    })
})
