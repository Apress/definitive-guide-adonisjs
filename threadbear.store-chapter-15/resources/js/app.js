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
        this.props.socket.on("bought", this.onBought)
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

    onCheckout = () => {
        const { buyer, seller, socket } = this.props
        const items = Object.values(this.state.items)

        socket.emit("check out", JSON.stringify({ buyer, seller, items }))

        this.setState({ items: {} })
    }

    render() {
        const items = Object.values(this.state.items)

        return (
            <div className="items">
                {items.map(this.renderItem)}
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
    const { buyer, seller } = cartContainer.dataset
    render(
        <Cart buyer={buyer} seller={seller} socket={socket} />,
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
