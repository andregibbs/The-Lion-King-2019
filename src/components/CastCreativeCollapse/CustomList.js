import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class CustomList extends Component {

    render() {

        const ensemble = this.props.data

        const customItems = ensemble.map((item, i) => {
            return <CustomListItem
                key={this.props.type+i}
                id={i}
                data={item}
    
            />
        });

        return (
            <Container fluid className="custom-list py-4 text-center">

                <Row>
                 <h2>{this.props.name}</h2>
                {customItems}
                </Row>

            </Container>
        )
    }
}

export default CustomList

class CustomListItem extends Component {
    render() {
        return (
           <>
                <Col md={6} >
                     {/*<h2>{this.props.siteId}</h2>*/}
                    <span>{this.props.data.name}</span>
                </Col>
             
            
            </>
        );
    }
}
