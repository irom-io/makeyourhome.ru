import React from 'react';
import Slider from 'blocks/slider/slider';
import postSlider from './post__slider.css';
import Rectangle from 'blocks/rectangle/rectangle';
import {createSrc} from 'blocks/item/item';

class PostSlider extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        let content;

        if (p_.images.length === 1) {
            content = (
                <Rectangle
                    width="5"
                    height="2"
                    src={createSrc(p_.images[0])}
                />
            )
        } else {
            content = (
                <div className={postSlider.wrapper}>
                    <Slider
                        dots={true}
                        arrows={false}
                        speed={1300}
                        easing="easeOutQuart"
                        touchMove={true}
                    >
                        {p_.images.map((image, index) => {
                            return (
                                <div key={`main__slider_${index}`}>
                                    <Rectangle
                                        width="5"
                                        height="2"
                                        src={createSrc(image)}
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            );
        }

        return (
            content
        );
    }
}

export default PostSlider;