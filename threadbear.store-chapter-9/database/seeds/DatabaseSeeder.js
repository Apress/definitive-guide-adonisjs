"use strict"

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use("Database")
const Factory = use("Factory")
const Hash = use("Hash")

class DatabaseSeeder {
    async run() {
        const created_at = Database.raw("CURRENT_TIME")

        await Database.insert({
            from: "assertchris",
            to: "christopher",
            created_at,
        }).into("redirects")

        await Database.insert({
            from: "thetutlage",
            to: "harminder",
            created_at,
        }).into("redirects")

        await Database.insert({
            first_name: "Harminder",
            last_name: "Virk",
            email: "virk.officials@gmail.com",
            password: await Hash.make("harminder123"),
            nickname: "harminder",
            created_at,
        }).into("customers")

        const ids = await Database.insert({
            first_name: "Christopher",
            last_name: "Pitt",
            email: "cgpitt@gmail.com",
            password: await Hash.make("christopher123"),
            nickname: "christopher",
            created_at,
        }).into("customers")

        await Database.insert({
            name: "Soft Teddy",
            price: 499,
            customer_id: ids[0],
            created_at,
        }).into("products")
    }
}

module.exports = DatabaseSeeder
