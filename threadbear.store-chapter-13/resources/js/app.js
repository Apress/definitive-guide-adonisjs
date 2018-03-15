import "regenerator-runtime/runtime-module"

// const load = async () => {
//     const response = await fetch("https://threadbear.store")
//     const text = await response.text()
//
//     console.log(text)
// }
//
// load()

import React, { Component } from "react"
import { render } from "react-dom"

class Heading extends Component {
    render() {
        const { style, children } = this.props
        return <h1 className={"heading-" + style}>{children}</h1>
    }
}

// render(<Heading style="bright">Welcome to ThreadBear</Heading>, document.body)
