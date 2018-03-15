"use strict"

const Model = use("Model")
const startCase = use("lodash/startCase")

class BaseModel extends Model {
    titleCase(...params) {
        return startCase(...params)
    }

    static _bootIfNotBooted() {
        if (this.name !== "BaseModel") {
            super._bootIfNotBooted()
        }
    }
}

module.exports = BaseModel
