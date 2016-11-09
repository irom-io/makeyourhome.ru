import React from 'react';
import Slider from 'blocks/slider/slider';
import postsSlider from './posts__slider.css';
import Rectangle from 'blocks/rectangle/rectangle';

class PostsSlider extends React.Component {
    constructor(p_) {
        super(p_);
    }
    render() {
        const p_ = this.props;

        return (
            <div className={postsSlider.wrapper}>
                <Slider
                    dots={true}
                    arrows={false}
                >
                    {p_.images.map((image, index) => {
                        return (
                            <div key={`main__slider_${index}`}>
                                <Rectangle
                                    width="2"
                                    height="1"
                                    src={image}
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}

export default PostsSlider;