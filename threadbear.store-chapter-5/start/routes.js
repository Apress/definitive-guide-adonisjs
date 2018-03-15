"use strict"

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use("Route")

Route.get("/", ({ view }) => {
    return view.render("page/home")
})

Route.get("/login", ({ view }) => {
    return view.render("user/login")
})

Route.post("/login", () => {
    // create new customer session
    return "POST /login"
})

Route.put("/logout", () => {
    // expire current customer session
    return "PUT /logout"
})

Route.get("/register", ({ view }) => {
    return view.render("user/register")
})

Route.post("/register", ({ request, response }) => {
    // ...create new customer profile

    response.json(request.all())
})

Route.get("/forgot-password", ({ view }) => {
    return view.render("user/forgot-password")
})

Route.post("/forgot-password", ({ request }) => {
    // create new password reset token and send email

    return JSON.stringify(request.all())
})

Route.get("/reset-password/:token", ({ view, params }) => {
    return view.render("user/reset-password", {
        token: params.token,
    })
})

Route.patch("/reset-password/:token", ({ request, params }) => {
    // create new password reset token and send email

    return JSON.stringify(request.all())
})

const redirects = {
    assertchris: "christopher",
    thetutlage: "harminder",
}

Route.get("/:customer", ({ response, view, params }) => {
    // return view.render("user/profile", {
    //     name: params.customer,
    // })

    // return JSON.stringify(Object.keys(response))

    const redirect = redirects[params.customer]

    if (redirect) {
        return response.route("profile", { customer: redirect })
    }

    response.send(
        view.render("user/profile", {
            name: params.customer,
        }),
    )
}).as("profile")

Route.get("/:customer/products", ({ params, response }) => {
    const products = [{ price: 4.99, title: "Teddy Bear" }]

    return response.for(params, {
        xml: () => [
            {
                product: products.map(product => ({
                    "@": { price: product.price },
                    "#": product.title,
                })),
            },
            "products",
        ],
        json: () => [
            {
                products,
            },
        ],
        default: () => "...render normal view",
    })
}).formats(["xml", "json"])

Route.put("/:customer", ({ params }) => {
    // update customer profile
    return "PUT /:customer " + params.customer
})

Route.delete("/:customer", ({ params }) => {
    // delete customer profile
    return "DELETE /:customer " + params.customer
})

Route.get("/:customer/products", ({ params }) => {
    // show customer's products
    return "GET /:customer/products " + params.customer
})

Route.post("/:customer/products", ({ params }) => {
    // create a new product
    return "POST /:customer/products " + params.customer
})

Route.get("/:customer/:product", ({ params }) => {
    // show customer profile
    return "GET /:customer/:product " + params.customer + " " + params.product
})

Route.put("/:customer/:product", ({ params }) => {
    // update customer profile
    return "PUT /:customer/:product " + params.customer + " " + params.product
})

Route.delete("/:customer/:product", ({ params }) => {
    // delete customer profile
    return (
        "DELETE /:customer/:product " + params.customer + " " + params.product
    )
})
