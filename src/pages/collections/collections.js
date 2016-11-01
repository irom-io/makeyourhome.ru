import React from 'react';
import TileLine from 'blocks/tile/_line/tile_line';
import page from 'blocks/page/page.css';

class Collections extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/1.jpg'), text: 'Жилой дом', descr: require('./html/1.html'), link: {to: '/projects?collection=houses', text: 'Жилые дома'}},
                {src: require('./images/2.jpg'), text: 'Баня', descr: require('./html/2.html'), link: {to: '/projects?collection=bath', text: 'Бани'}},
                {src: require('./images/3.jpg'), text: 'Гараж', descr: require('./html/3.html'), link: {to: '/projects?collection=garages', text: 'Гаражи'}},
                {src: require('./images/4.jpg'), text: 'Для отдыха', descr: require('./html/4.html'), link: {to: '/projects?collection=recreation', text: 'Для отдыха'}},
                {src: require('./images/5.jpg'), text: 'Беседка', descr: require('./html/5.html'), link: {to: '/projects?collection=cabin', text: 'Беседки'}},
                {src: require('./images/6.jpg'), text: 'Разное', descr: require('./html/6.html'), link: {to: '/projects?collection=other', text: 'Разное'}}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={page.content}>
                {s_.items.map((item, index) => {
                    return (
                        <TileLine
                            key={`collection_${index}`}
                            src={item.src}
                            text={item.text}
                            link={item.link}
                        >
                            <div dangerouslySetInnerHTML={{__html: item.descr}}></div>
                        </TileLine>
                    )
                })}
            </div>
        );
    }
}

export default Collections;