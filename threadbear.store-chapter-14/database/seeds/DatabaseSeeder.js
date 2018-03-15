"use strict"

const Database = use("Database")
const Factory = use("Factory")
const Hash = use("Hash")
const moment = use("moment")

class DatabaseSeeder {
    async run() {
        const timestamps = {
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        }

        await Database.insert([
            {
                from: "assertchris",
                to: "christopher",
                ...timestamps,
            },
            {
                from: "thetutlage",
                to: "harminder",
                ...timestamps,
            },
        ]).into("redirects")

        await Database.insert([
            {
                first_name: "Harminder",
                last_name: "Virk",
                email: "virk.officials@gmail.com",
                password: await Hash.make("harminder123"),
                nickname: "harminder",
                ...timestamps,
            },
            {
                first_name: "Christopher",
                last_name: "Pitt",
                email: "cgpitt@gmail.com",
                password: await Hash.make("christopher123"),
                nickname: "christopher",
                ...timestamps,
            },
        ]).into("customers")

        const customerIds = await this.ids("customers")

        await Database.insert([
            {
                name: "Soft Teddy",
                price: 499,
                customer_id: customerIds[1],
                ...timestamps,
            },
        ]).into("products")

        const productIds = await this.ids("products")

        await Database.insert([
            {
                buyer_id: customerIds[0],
                seller_id: customerIds[1],
                status: "pending",
                ...timestamps,
            },
        ]).into("orders")

        const orderIds = await this.ids("orders")

        await Database.insert([
            {
                order_id: orderIds[0],
                product_id: productIds[0],
                quantity: 2,
                price: 499,
                ...timestamps,
            },
        ]).into("order_items")
    }

    async ids(table) {
        return await Database.select("id")
            .from(table)
            .orderBy("id", "asc")
            .map(next => next.id)
    }
}

module.exports = DatabaseSeeder
