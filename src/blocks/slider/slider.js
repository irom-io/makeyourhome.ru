import React from 'react';
import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Slider extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        return (
            <ReactSlick {...this.props}>
                {this.props.children}
            </ReactSlick>
        );
    }
}

export default Slider;