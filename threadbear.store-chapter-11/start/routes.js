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
// const Database = use("Database")

Route.get("/", async ({ view }) => {
    // const result = await Database.raw("SELECT CURRENT_TIME as time")
    // console.log("when you hear the beep, it will be " + result[0].time)

    return view.render("page/home")
})

// Route.get("/add-redirects", async () => {
//     const created_at = Database.raw("CURRENT_TIME")

//     await Database.insert({
//         from: "assertchris",
//         to: "christopher",
//         created_at,
//     }).into("redirects")

//     await Database.insert({
//         from: "thetutlage",
//         to: "harminder",
//         created_at,
//     }).into("redirects")

//     return "done"
// })

Route.get("/login", "CustomerController.showLogin").as("login")
Route.post("/login", "CustomerController.doLogin")
Route.get("/logout", "CustomerController.logout")
Route.get("/register", "CustomerController.showRegister")
Route.post("/register", "CustomerController.doRegister")
Route.get("/forgot-password", "CustomerController.showForgotPassword")
Route.post("/forgot-password", "CustomerController.doForgotPassword")
Route.get("/reset-password/:token", "CustomerController.showResetPassword")
Route.patch("/reset-password/:token", "CustomerController.doResetPassword")
Route.get("/oops", "PageController.oops")
Route.get("/dashboard", "CustomerController.dashboard").as("dashboard")
Route.get("/:customer", "CustomerController.showProfile").as("profile")
Route.put("/:customer", "CustomerController.updateProfile")
Route.delete("/:customer", "CustomerController.deleteProfile")

// Route.get("/login", ({ view }) => {
//     return view.render("customer/login")
// })

// Route.post("/login", () => {
//     return "POST /login"
// })

// Route.put("/logout", () => {
//     return "PUT /logout"
// })

// Route.get("/register", ({ view }) => {
//     return view.render("customer/register")
// })

// Route.post("/register", ({ request, response }) => {
//     response.json(request.all())
// })

// Route.get("/forgot-password", ({ view }) => {
//     return view.render("customer/forgot-password")
// })

// Route.post("/forgot-password", ({ request }) => {
//     return JSON.stringify(request.all())
// })

// Route.get("/reset-password/:token", ({ view, params }) => {
//     return view.render("customer/reset-password", {
//         token: params.token,
//     })
// })

// Route.patch("/reset-password/:token", ({ request, params }) => {
//     return JSON.stringify(request.all())
// })

// const redirects = {
//     assertchris: "christopher",
//     thetutlage: "harminder",
// }

// Route.get("/:customer", ({ response, view, params }) => {
//     const redirect = redirects[params.customer]

//     if (redirect) {
//         return response.route("profile", { customer: redirect })
//     }

//     response.send(
//         view.render("customer/profile", {
//             name: params.customer,
//         }),
//     )
// }).as("profile")

// Route.put("/:customer", ({ params }) => {
//     return "PUT /:customer " + params.customer
// })

// Route.delete("/:customer", ({ params }) => {
//     return "DELETE /:customer " + params.customer
// })

Route.post("/:customer/products", ({ params }) => {
    // create a new product
    return "POST /:customer/products " + params.customer
})

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
