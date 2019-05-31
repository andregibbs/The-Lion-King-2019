import React, { Component } from 'react'
import { Container } from 'reactstrap'

class CustomList extends Component {

    render() {

        const ensemble = this.props.data

        console.log(ensemble)

        const customItems = ensemble.map((item, i) => {
            return <CustomListItem
                key={this.props.type+i}
                id={i}
                data={item}
    
            />
        });

        return (
            <Container fluid className="custom-list">
                {customItems}
            </Container>
        )
    }
}

export default CustomList

class CustomListItem extends Component {
    render() {
        return (
           <>
            <div className="customer_item">    
                <span>{this.props.data.name}</span>
            </div>
            </>
        );
    }
}
