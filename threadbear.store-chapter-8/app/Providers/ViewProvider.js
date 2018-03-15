"use strict"

const { ServiceProvider } = require("@adonisjs/fold")
const Edge = require("edge.js")

class ViewProvider extends ServiceProvider {
    boot() {
        Edge.global(
            "toTitleCase",
            string => string.replace(
                /^(.)|\s+(.)/g,
                match => match.toUpperCase(),
            ),
        )
    }
}

module.exports = ViewProvider
