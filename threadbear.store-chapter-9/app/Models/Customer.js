"use strict"

const Model = use("Model")
const Hash = use("Hash")

class Customer extends Model {
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

    static async authenticate(email, password) {
        const customer = await Customer.findByOrFail("email", email)
        const matches = await Hash.verify(password, customer.password)

        if (matches) {
            return customer
        }

        throw new Error("invalid credentials")
    }
}

module.exports = Customer
