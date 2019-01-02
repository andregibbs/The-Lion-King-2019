import React, { Component } from "react"

class HomeTemplate extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const data = this.props.data

        return (
            <div>
                <p>{data.title}</p>
            </div>
        )
    }
}

export default HomeTemplate 