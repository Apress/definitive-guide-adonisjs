"use strict"

const Schema = use("Schema")

class CustomersSchema extends Schema {
    up() {
        this.create("customers", table => {
            table.increments()
            table.string("first_name")
            table.string("last_name")
            table.string("email").unique()
            table.string("password")
            table.string("nickname").unique()
            table.string("token").unique()
            table.timestamps()
        })
    }

    down() {
        this.drop("customers")
    }
}

module.exports = CustomersSchema
