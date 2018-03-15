"use strict"

const BaseModel = use("App/Models/BaseModel")

class Order extends BaseModel {
    items() {
        return this.hasMany("App/Models/OrderItem")
    }

    buyer() {
        return this.belongsTo("App/Models/Customer", "buyer_id")
    }

    seller() {
        return this.belongsTo("App/Models/Customer", "seller_id")
    }
}

module.exports = Order
