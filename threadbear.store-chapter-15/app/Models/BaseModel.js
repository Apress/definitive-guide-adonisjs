"use strict"

const Model = use("Model")
const startCase = use("lodash/startCase")

class BaseModel extends Model {
    titleCase(...params) {
        return startCase(...params)
    }
}

module.exports = BaseModel
