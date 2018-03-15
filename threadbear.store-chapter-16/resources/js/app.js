import "babel-polyfill"

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

// class Heading extends Component {
//     render() {
//         const { style, children } = this.props
//         return <h1 className={"heading-" + style}>{children}</h1>
//     }
// }
//
// render(<Heading style="bright">Welcome to ThreadBear</Heading>, document.body)

// const socket = io()

// socket.on("server message", message => {
//     console.log("server message:", message)
// })

const dollars = cents => "$" + (cents / 100).toFixed(2)

class Cart extends Component {
    state = {
        items: {},
    }

    componentDidMount() {
        const { stripeKey } = this.props

        this.props.socket.on("bought", this.onBought)

        this.stripe = Stripe(stripeKey)
        this.elements = this.stripe.elements()

        const card = this.elements.create("card")
        card.mount("#card-element")

        this.card = card
    }

    onBought = data => {
        this.onBuy(JSON.parse(data))
    }

    onBuy = ({ id, name, price }) => {
        const key = "_" + id
        const previous = this.state.items[key]
        const quantity = previous ? previous.quantity + 1 : 1

        this.setState({
            items: {
                ...this.state.items,
                [key]: {
                    id,
                    name,
                    price,
                    quantity,
                },
            },
        })
    }

    onCheckout = async () => {
        const { buyer, seller, stripeKey, socket } = this.props
        const items = Object.values(this.state.items)

        const result = await this.stripe.createToken(this.card)
        const token = result.token.id

        console.log("check out event", buyer, seller, token)

        socket.emit(
            "check out",
            JSON.stringify({ buyer, seller, token, items }),
        )

        this.setState({ items: {} })
    }

    render() {
        const items = Object.values(this.state.items)

        return (
            <div className="items">
                {items.map(this.renderItem)}
                <div id="card-element" />
                <CartTotal items={items} onCheckout={this.onCheckout} />
            </div>
        )
    }

    renderItem = item => {
        if (item.quantity < 1) {
            return
        }

        return (
            <CartItem
                {...item}
                key={item.id}
                onPlus={() => this.onPlusItem(item)}
                onMinus={() => this.onMinusItem(item)}
            />
        )
    }

    onPlusItem = item => {
        const key = "_" + item.id

        this.setState({
            items: {
                ...this.state.items,
                [key]: {
                    ...this.state.items[key],
                    quantity: item.quantity + 1,
                },
            },
        })
    }

    onMinusItem = item => {
        const key = "_" + item.id

        this.setState({
            items: {
                ...this.state.items,
                [key]: {
                    ...this.state.items[key],
                    quantity: item.quantity - 1,
                },
            },
        })
    }
}

const CartItem = ({ name, price, quantity, onPlus, onMinus }) => (
    <div className="item">
        {name}: <strong>{quantity}</strong> x <strong>{dollars(price)}</strong>
        <button onClick={onPlus}>+</button>
        <button onClick={onMinus}>-</button>
    </div>
)

const CartTotal = ({ items, onCheckout }) => (
    <div className="total">
        Total:{" "}
        <strong>
            {dollars(
                items
                    .map(item => item.quantity * item.price)
                    .reduce((total, item) => total + item, 0),
            )}
        </strong>
        <br />
        <button onClick={onCheckout}>Check Out</button>
    </div>
)

class BuyNow extends Component {
    onBuyNow = () => {
        const { id, name, price, socket } = this.props
        socket.emit("buy", JSON.stringify({ id, name, price }))
    }

    render() {
        return <button onClick={this.onBuyNow}>buy now</button>
    }
}

const socket = io()

const cartContainer = document.querySelector(".cart")

if (cartContainer) {
    const { buyer, seller, key } = cartContainer.dataset

    render(
        <Cart buyer={buyer} seller={seller} stripeKey={key} socket={socket} />,
        cartContainer,
    )
}

const buyNowContainers = document.querySelectorAll(".buy-now")

for (let buyNowContainer of buyNowContainers) {
    const { id, name, price } = buyNowContainer.dataset

    render(
        <BuyNow id={id} name={name} price={price} socket={socket} />,
        buyNowContainer,
    )
}

const forms = document.querySelectorAll(".ajax-form")

for (let form of forms) {
    const method = form.getAttribute("method").toUpperCase()
    const action = form.getAttribute("action")

    form.addEventListener("submit", async event => {
        event.preventDefault()

        const data = []
        const inputs = form.querySelectorAll("input")

        for (let input of inputs) {
            data.push(input.name + "=" + encodeURIComponent(input.value))
        }

        const response = await fetch(action, {
            mode: "cors",
            credentials: "include",
            redirect: "follow",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
            method,
            body: data.join("&"),
        })

        alert("saved!")

        // we should do another ajax request to reload the products list
        // for now, we'll just refresh the whole page...
        location.reload()
    })
}
