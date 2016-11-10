import React from 'react';
import TileLine from 'blocks/tile/_line/tile_line';
import L10n from 'blocks/l10n/l10n';

import page from 'blocks/page/page.css';

class Collections extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {src: require('./images/1.jpg'), key: 'house', link: {to: '/projects?collection=houses', key: 'house'}},
                {src: require('./images/2.jpg'), key: 'bath', link: {to: '/projects?collection=bath', key: 'bath'}},
                {src: require('./images/3.jpg'), key: 'garage', link: {to: '/projects?collection=garages', key: 'garage'}},
                {src: require('./images/4.jpg'), key: 'recreation', link: {to: '/projects?collection=recreation', key: 'recreation'}},
                {src: require('./images/5.jpg'), key: 'cabin', link: {to: '/projects?collection=cabin', key: 'cabin'}},
                {src: require('./images/6.jpg'), key: 'other', link: {to: '/projects?collection=other', key: 'other'}}
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
                            description={L10n(`collections.${item.key}.descr`)}
                            link={item.link}
                        />
                    )
                })}
            </div>
        );
    }
}

export default Collections;