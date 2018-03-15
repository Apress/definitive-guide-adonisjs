"use strict"

const geoip = use("geoip-lite")

const { getCountry, getCountryByAbbreviation, getCurrency } = use(
    "currency-map-country",
)

class CurrencySelector {
    async handle({ request }, next) {
        const ip = request.ip()
        const reference = geoip.lookup(ip)

        let currency

        if (!reference) {
            request.country = "Unknown"
            request.currency = "USD"

            currency = getCurrency("USD")
        } else {
            request.country = reference.country

            const name = getCountryByAbbreviation(request.country)
            const country = getCountry(name)

            request.currency = country.cur

            currency = getCurrency(country.cur)
        }

        request.currencyFormat = currency.symbolFormat

        await next()
    }
}

module.exports = CurrencySelector
