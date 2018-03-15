"use strict"

const Controller = use("App/Controllers/Http/Controller")
const Database = use("Database")

const Redirect = use("App/Models/Redirect")
const Customer = use("App/Models/Customer")
const Product = use("App/Models/Product")

// const redirects = {
//     assertchris: "christopher",
//     thetutlage: "harminder",
// }

class CustomerController extends Controller {
    showLogin({ view }) {
        return view.render("customer/login")
    }

    async doLogin({ request, response }) {
        // create new customer session
        // return "POST /login"

        const email = request.input("email")
        const password = request.input("password")

        try {
            const customer = await Customer.authenticate(email, password)
            return "valid"
        } catch (e) {
            return "invalid"
        }
    }

    logout() {
        // expire current customer session
        return "PUT /logout"
    }

    showRegister({ view }) {
        return view.render("customer/register")
    }

    async doRegister({ request, response }) {
        // ...create new customer profile
        // this.showRequestParameters(context)

        const customer = await Customer.create(
            request.only([
                "first_name",
                "last_name",
                "email",
                "password",
                "nickname",
            ]),
        )

        // const customer = new Customer()
        // customer.first_name = request.input("first_name")
        // customer.last_name = request.input("last_name")
        // customer.email = request.input("email")
        // customer.password = request.input("password")
        // customer.nickname = request.input("nickname")
        // await customer.save()

        return "done"
    }

    showForgotPassword({ view }) {
        return view.render("customer/forgot-password")
    }

    doForgotPassword(context) {
        // create new password reset token and send email
        this.showRequestParameters(context)
    }

    showResetPassword({ view, params }) {
        return view.render("customer/reset-password", {
            token: params.token,
        })
    }

    doResetPassword(context) {
        // create new password reset token and send email
        this.showRequestParameters(context)
    }

    async showProfile({ params, response, view }) {
        // const rows = await Database.select("from", "to").from("redirects")

        const rows = await Redirect.all()

        const redirects = Array.from(rows).reduce((accumulator, row) => {
            accumulator[row.from] = row.to
            return accumulator
        }, {})

        const redirect = redirects[params.customer]

        if (redirect) {
            return response.route("profile", { customer: redirect })
        }

        // const customer = await Database.select("*")
        //     .from("customers")
        //     .where("nickname", params.customer)
        //     .first()

        const customer = await Customer.query()
            .where("nickname", params.customer)
            .first()

        if (!customer) {
            return view.render("oops", {
                type: "PROFILE_MISSING",
            })
        }

        // const products = await Database.select("*")
        //     .from("products")
        //     .where("customer_id", customer.id)

        // const products = await Product.query().where("customer_id", customer.id)

        const products = await customer.products()

        return view.render("customer/profile", {
            customer,
            products,
        })
    }

    updateProfile({ params }) {
        // update customer profile
        return "PUT /:customer " + params.customer
    }

    deleteProfile({ params }) {
        // delete customer profile
        return "DELETE /:customer " + params.customer
    }
}

module.exports = CustomerController
