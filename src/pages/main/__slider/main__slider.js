import React from 'react';
import Slider from 'blocks/slider/slider';
import mainSlider from './main__slider.css';
import Link from 'blocks/link/link';
import Rectangle from 'blocks/rectangle/rectangle';

class MainSlider extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {
                    text: 'Готовые проекты',
                    src: require('./images/1.jpg')
                },
                {
                    text: 'Индивидуальные проекты',
                    src: require('./images/2.jpg')
                },
                {
                    text: 'Примеры работ',
                    src: require('./images/3.jpg')
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
                                    <Link>
                                        <div className={mainSlider.text}>{item.text}</div>
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