"use strict"

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
    "@adonisjs/lucid/providers/LucidProvider",
    "@adonisjs/bodyparser/providers/BodyParserProvider",
    "@adonisjs/framework/providers/AppProvider",
    "@adonisjs/framework/providers/ViewProvider",
    __dirname + "/../App/Providers/ViewProvider",
    "@adonisjs/validator/providers/ValidatorProvider",
    "@adonisjs/session/providers/SessionProvider",
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = ["@adonisjs/lucid/providers/MigrationsProvider"]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = ["App/Commands/SendReminder"]

module.exports = { providers, aceProviders, aliases, commands }
