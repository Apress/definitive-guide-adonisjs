"use strict"

const Hash = use("Hash")
const { ValidationException } = use("@adonisjs/validator/src/Exceptions")

const BaseModel = use("App/Models/BaseModel")

class Customer extends BaseModel {
    products() {
        return this.hasMany("App/Models/Product")
    }

    setNickname(nickname) {
        return nickname.toLowerCase()
    }

    static boot() {
        super.boot()

        this.addHook("beforeCreate", async customer => {
            customer.password = await Hash.make(customer.password)
        })
    }

    static get computed() {
        return ["displayName"]
    }

    getDisplayName({ first_name, last_name }) {
        return this.titleCase(first_name + " " + last_name)
    }

    static async authenticate(email, password) {
        const customer = await Customer.findByOrFail("email", email)
        const matches = await Hash.verify(password, customer.password)

        if (matches) {
            return customer
        }

        throw ValidationException.validationFailed({
            email: "invalid credentials",
        })
    }

    pendingOrders() {
        return this.hasMany("App/Models/Order", "id", "seller_id").where(
            "status",
            "pending",
        )
    }

    completeOrders() {
        return this.hasMany("App/Models/Order", "id", "seller_id").where(
            "status",
            "complete",
        )
    }
}

module.exports = Customer
