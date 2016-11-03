import React from 'react';
import Slider from 'blocks/slider/slider';
import mainSlider from './main__slider.css';
import Link from 'blocks/link/link';
import Rectangle from 'blocks/rectangle/rectangle';
import L10n from 'blocks/l10n/l10n';

class MainSlider extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {
                    key: 'finishedProjects',
                    src: require('./images/1.jpg'),
                    to: '/projects'
                },
                {
                    key: 'individualProjects',
                    src: require('./images/2.jpg'),
                    to: '/addProject'
                },
                {
                    key: 'workExamples',
                    src: require('./images/3.jpg'),
                    to: '/projects'
                }
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={mainSlider.wrapper}>
                <Slider
                    dots={true}
                    arrows={false}
                >
                    {s_.items.map((item, index) => {
                        return (
                            <div key={`main__slider_${index}`}>
                                <Rectangle width="2" height="1">
                                    <div
                                        className={mainSlider.img}
                                        title={item.text}
                                        style={{backgroundImage: `url(${item.src})`}}
                                    >
                                    </div>
                                    <Link to={item.to}>
                                        <div className={mainSlider.text}>{L10n(item.key)}</div>
                                    </Link>
                                </Rectangle>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}

export default MainSlider;