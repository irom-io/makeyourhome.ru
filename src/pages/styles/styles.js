import React from 'react';
import TileLine from 'blocks/tile/_line/tile_line';
import page from 'blocks/page/page.css';

class Styles extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/1.jpg'), text: 'Современный', descr: require('./html/1.html'), link: {to: '/projects?style=modern', text: 'Современные'}},
                {src: require('./images/2.jpg'), text: 'Классический', descr: require('./html/2.html'), link: {to: '/projects?style=classic', text: 'Классические'}},
                {src: require('./images/3.jpg'), text: 'Дачный', descr: require('./html/3.html'), link: {to: '/projects?style=countryside', text: 'Дачные'}},
                {src: require('./images/4.jpg'), text: 'Европейский', descr: require('./html/4.html'), link: {to: '/projects?style=european', text: 'Европейские'}},
                {src: require('./images/5.jpg'), text: 'Американский', descr: require('./html/5.html'), link: {to: '/projects?style=american', text: 'Американские'}},
                {src: require('./images/6.jpg'), text: 'Деревянный', descr: require('./html/6.html'), link: {to: '/projects?style=wooden', text: 'Деревянные'}},
                {src: require('./images/7.jpg'), text: 'Бунгало', descr: require('./html/7.html'), link: {to: '/projects?style=bungalow', text: 'Бунгало'}}
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
                            key={`styles_${index}`}
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

export default Styles;