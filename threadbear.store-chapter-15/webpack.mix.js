let mix = require("laravel-mix")

mix.setPublicPath("public")

mix.js("resources/js/app.js", "public/js/app.js")
mix.sass("resources/css/app.scss", "public/css/app.css")
