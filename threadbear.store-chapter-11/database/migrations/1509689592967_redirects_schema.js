"use strict"

const Schema = use("Schema")

class RedirectsSchema extends Schema {
    up() {
        this.create("redirects", table => {
            table.increments()
            table.string("from")
            table.string("to")
            table.timestamps()
        })
    }

    down() {
        this.drop("redirects")
    }
}

module.exports = RedirectsSchema
