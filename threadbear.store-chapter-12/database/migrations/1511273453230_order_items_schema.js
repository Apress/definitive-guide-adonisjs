"use strict"

const Schema = use("Schema")

class OrderItemsSchema extends Schema {
    up() {
        this.create("order_items", table => {
            table.increments()
            table.integer("order_id")
            table.integer("product_id")
            table.integer("quantity")
            table.integer("price")
            table.text("comments")
            table.timestamps()
        })
    }

    down() {
        this.drop("order_items")
    }
}

module.exports = OrderItemsSchema
