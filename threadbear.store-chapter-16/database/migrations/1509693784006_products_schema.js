"use strict"

const Schema = use("Schema")

class ProductsSchema extends Schema {
    up() {
        this.create("products", table => {
            table.increments()
            table.string("name")
            table.integer("price")
            table.integer("customer_id")
            table.timestamps()
        })
    }

    down() {
        this.drop("products")
    }
}

module.exports = ProductsSchema
