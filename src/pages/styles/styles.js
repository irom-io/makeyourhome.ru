import React from 'react';
import TileLine from 'blocks/tile/_line/tile_line';
import L10n from 'blocks/l10n/l10n';

import page from 'blocks/page/page.css';

class Styles extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/1.jpg'), key: 'modern', link: {to: '/projects?style=modern', key: 'modern'}},
                {src: require('./images/2.jpg'), key: 'classic', link: {to: '/projects?style=classic', key: 'classic'}},
                {src: require('./images/3.jpg'), key: 'countryside', link: {to: '/projects?style=countryside', key: 'countryside'}},
                {src: require('./images/4.jpg'), key: 'european', link: {to: '/projects?style=european', key: 'european'}},
                {src: require('./images/5.jpg'), key: 'american', link: {to: '/projects?style=american', key: 'american'}},
                {src: require('./images/6.jpg'), key: 'wooden', link: {to: '/projects?style=wooden', key: 'wooden'}},
                {src: require('./images/7.jpg'), key: 'bungalow', link: {to: '/projects?style=bungalow', key: 'bungalow'}}
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
                            name="styles"
                            key={`styles_${index}`}
                            src={item.src}
                            text={L10n(`styles.${item.key}`)}
                            link={item.link}
                        >
                            <div dangerouslySetInnerHTML={{__html: L10n(`styles.${item.key}.descr`)}}></div>
                        </TileLine>
                    )
                })}
            </div>
        );
    }
}

export default Styles;