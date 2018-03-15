"use strict"

const BaseModel = use("App/Models/BaseModel")

class OrderItem extends BaseModel {
    product() {
        return this.belongsTo("App/Models/Product")
    }
}

module.exports = OrderItem
