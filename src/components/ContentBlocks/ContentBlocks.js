import React, { Component } from "react"
import FaqBlock from "./blocks/FaqBlock"
import BookTicketsBlock from "./blocks/BookTicketsBlock"

class ContentBlocks extends Component {

    render() {
        const contentBlocks = this.props.data.contentBlocks
        let blocks = "";

        if (contentBlocks !== null) {
        
            blocks = contentBlocks.map((block, i) => {

                if (block.faqBlock !== null) {

                    return <FaqBlock data={block} key={i} />

                } else if (block.bookTicketsBlock !== null) {

                    return <BookTicketsBlock data={block} key={i} />

                } else {
                    return
                }

            })

        }

        return (
            <>
                { blocks }
            </>
        )

    }
}

export default ContentBlocks