"use strict"

const Controller = use("App/Controllers/Http/Controller")
const Database = use("Database")
const { validate } = use("Validator")

const Redirect = use("App/Models/Redirect")
const Customer = use("App/Models/Customer")
const Product = use("App/Models/Product")
const ProfileMissingException = use("App/Exceptions/ProfileMissingException")

class CustomerController extends Controller {
    showLogin({ view }) {
        return view.render("customer/login")
    }

    async doLogin({ request, response, session }) {
        const rules = {
            email: "required|email|exists:customers,email",
            password: "required",
        }

        // const validation = await validate(request.all(), rules)

        // if (validation.fails()) {
        //     return response.json(validation.messages())
        // }

        // if (!await this.validate({ request, response, session, rules })) {
        //     return
        // }

        await this.validate({ request, response, session, rules })

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

    async doRegister({ request, response, session }) {
        const rules = {
            first_name: "required",
            last_name: "required",
            email: "required|email|unique:customers,email",
            password: "required",
            confirm_password: "required|same:password",
            nickname: "required",
        }

        const messages = {
            "first_name.required": "you must provide a first name",
            "last_name.required": "you must provide a last name",
            "email.required": "you must provide an email address",
            "email.unique": "your email address must be unique",
            "password.required": "you must provide a password",
            "confirm_password.required": "you must confirm the password",
            "confirm_password.same": "passwords must match",
            "nickname.required": "you must provide a nickname",
        }

        // if (
        //     !await this.validate({
        //         request,
        //         response,
        //         session,
        //         rules,
        //         messages,
        //     })
        // ) {
        //     return
        // }

        await this.validate(request, rules, messages)

        const customer = await Customer.create(
            request.only([
                "first_name",
                "last_name",
                "email",
                "password",
                "nickname",
            ]),
        )

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
        const rows = await Redirect.all()

        const redirects = Array.from(rows).reduce((accumulator, row) => {
            accumulator[row.from] = row.to
            return accumulator
        }, {})

        const redirect = redirects[params.customer]

        if (redirect) {
            return response.route("profile", { customer: redirect })
        }

        const customer = await Customer.query()
            .where("nickname", params.customer)
            .first()

        if (!customer) {
            // return view.render("oops", {
            //     type: "PROFILE_MISSING",
            // })

            throw new ProfileMissingException()
        }

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
