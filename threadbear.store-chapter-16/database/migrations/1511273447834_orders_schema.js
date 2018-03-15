"use strict"

const Schema = use("Schema")

class OrdersSchema extends Schema {
    up() {
        this.create("orders", table => {
            table.increments()
            table.integer("buyer_id")
            table.integer("seller_id")
            table.string("status")
            table.string("token")
            table.timestamps()
        })
    }

    down() {
        this.drop("orders")
    }
}

module.exports = OrdersSchema
