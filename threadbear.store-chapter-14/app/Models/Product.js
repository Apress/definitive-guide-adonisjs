"use strict"

const BaseModel = use("App/Models/BaseModel")

class Product extends BaseModel {
    static get computed() {
        return ["displayName"]
    }

    getDisplayName({ name }) {
        return this.titleCase(name)
    }
}

module.exports = Product
