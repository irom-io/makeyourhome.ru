import React from 'react';
import TileLine from 'blocks/tile/_line/tile_line';
import L10n from 'blocks/l10n/l10n';

import page from 'blocks/page/page.css';

class Collections extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/1.jpg'), key: 'house', descr: require('./html/1.html'), link: {to: '/projects?collection=houses', key: 'house'}},
                {src: require('./images/2.jpg'), key: 'bath', descr: require('./html/2.html'), link: {to: '/projects?collection=bath', key: 'bath'}},
                {src: require('./images/3.jpg'), key: 'garage', descr: require('./html/3.html'), link: {to: '/projects?collection=garages', key: 'garage'}},
                {src: require('./images/4.jpg'), key: 'recreation', descr: require('./html/4.html'), link: {to: '/projects?collection=recreation', key: 'recreation'}},
                {src: require('./images/5.jpg'), key: 'cabin', descr: require('./html/5.html'), link: {to: '/projects?collection=cabin', key: 'cabin'}},
                {src: require('./images/6.jpg'), key: 'other', descr: require('./html/6.html'), link: {to: '/projects?collection=other', key: 'other'}}
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
                            name="collections"
                            key={`collection_${index}`}
                            src={item.src}
                            text={L10n(`collections.${item.key}`)}
                            link={item.link}
                        >
                            <div dangerouslySetInnerHTML={{__html: L10n(`collections.${item.key}.descr`)}}></div>
                        </TileLine>
                    )
                })}
            </div>
        );
    }
}

export default Collections;