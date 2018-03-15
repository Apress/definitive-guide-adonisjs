"use strict"

class Controller {
    showRequestParameters({ request, response }) {
        response.json(request.all())
    }
}

module.exports = Controller
