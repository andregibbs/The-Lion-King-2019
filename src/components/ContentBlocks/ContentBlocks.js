import React, { Component } from "react"
import FaqBlock from "./blocks/FaqBlock"
import BookTicketsBlock from "./blocks/BookTicketsBlock"
import TextBlockFullWidth from "./blocks/TextBlockFullWidth"
import InfoBlock from "./blocks/InfoBlock"
import BgImageTextBlock from "./blocks/BgImageTextBlock"

class ContentBlocks extends Component {

    render() {
        const contentBlocks = this.props.data.contentBlocks
        let blocks = "";

        if (contentBlocks !== null) {
        
            blocks = contentBlocks.map((block, i) => {

                switch (block.type) {
                    case "bookTicketsBlock":
                        return <BookTicketsBlock data={block.bookTicketsBlock} key={i} />
                
                    case "textBlockFullWidth":
                        return <TextBlockFullWidth data={block.textBlockFullWidth} key={i} />
                
                    case "faqBlock": 
                        return <FaqBlock data={block.faqBlock} key={i} />
                        
                    case "infoBlock": 
                        return <InfoBlock data={block.infoBlock} key={i} />

                    case "bgImageTextBlock": 
                        return <BgImageTextBlock data={block.bgImageTextBlock} key={i} />
        
                    default:
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