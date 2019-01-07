import React, { Component } from 'react'
import Lightbox from 'react-images'
import { Container, Row, Col } from 'reactstrap'
import Img from 'gatsby-image'
import Slider from "react-slick";

class ImageGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

    openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    gotoImage(index) {
        this.setState({
            currentImage: index,
        });
    }

    handleClickImage() {
        if (this.state.currentImage === this.props.images.length - 1) return;
        this.gotoNext();
    }

    renderGallery() {
        const images = this.props.data;

        if (!images) return;

        const gallery = images.map((obj, i) => {
            // console.log(obj)
            return (
                <Col xs={12} sm={6} md={3} xl={3} key={i} className="p-2 gallery__thumb">
                    <a
                        href={obj.src.childImageSharp.fluid.src}
                        onClick={(e) => this.openLightbox(i, e)}
                        style={{
                            display: 'block'
                        }}
                    >
                        <Img fluid={obj.thumbnail.childImageSharp.fluid} />
                    </a>
                </Col>
            );
        });

        const gallerySlider = images.map((obj, i) => {
            return (
                <Img fluid={obj.thumbnail.childImageSharp.fluid} key={i} />
            );
        });

        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <>
                <div className="d-sm-none bg-lighter-grey gallery">
                    <Slider {...settings}>
                        {gallerySlider}
                    </Slider>
                    <div className="gallery-slider-controls">
                        Swipe to view gallery
                    </div> 
                </div>
                <Row className="d-none d-sm-flex">
                    {gallery}
                </Row>
            </>
        );
    }

    render() {
        // Extract just the src from images data
        const imageSrcs = this.props.data.map(image => image.src.childImageSharp.fluid )

        return (
            <Container fluid className="pt-3 pb-3">
                <div className="pl-sm-2 pr-sm-2">
                    {this.renderGallery()}
                </div>
                <Lightbox
                    currentImage={this.state.currentImage}
                    images={imageSrcs}
                    isOpen={this.state.lightboxIsOpen}
                    onClickImage={this.handleClickImage}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    onClickThumbnail={this.gotoImage}
                    onClose={this.closeLightbox}
                />
            </Container>
        )
    }
}

export default ImageGallery