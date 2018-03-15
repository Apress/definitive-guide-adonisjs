"use strict"

const Controller = use("App/Controllers/Http/Controller")

const redirects = {
    assertchris: "christopher",
    thetutlage: "harminder",
}

class CustomerController extends Controller {
    showLogin({ view }) {
        return view.render("customer/login")
    }

    doLogin() {
        // create new customer session
        return "POST /login"
    }

    logout() {
        // expire current customer session
        return "PUT /logout"
    }

    showRegister({ view }) {
        return view.render("customer/register")
    }

    doRegister(context) {
        // ...create new customer profile
        this.showRequestParameters(context)
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

    showProfile({ params, response, view }) {
        const redirect = redirects[params.customer]

        if (redirect) {
            return response.route("profile", { customer: redirect })
        }

        response.send(
            view.render("customer/profile", {
                name: params.customer,
            }),
        )
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
