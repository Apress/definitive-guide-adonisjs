"use strict"

const Route = use("Route")

Route.group(() => {
    Route.get("/dashboard", "CustomerController.dashboard").as("dashboard")

    Route.put("/:customer", "CustomerController.updateProfile").as(
        "updateProfile",
    )

    Route.delete("/:customer", "CustomerController.deleteProfile").as(
        "deleteProfile",
    )
}).middleware(["auth"])

Route.get("/", async ({ view }) => {
    return view.render("page/home")
})

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
Route.get("/:customer", "CustomerController.showProfile").as("profile")

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
