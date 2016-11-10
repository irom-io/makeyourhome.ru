import React from 'react';
import {TileContent} from 'blocks/tile/tile';
import Link from 'blocks/link/link';
import Rectangle from 'blocks/rectangle/rectangle';
import Toolbar from 'blocks/toolbar/toolbar';
import config from '../../../../server/data/config.json';

import tileLine from './tile_line.css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';
import text from 'blocks/text/text.css';

class TileLine extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {};
    }
    render() {
        const p_ = this.props;
        
        return (
            <div className={tileLine.wrapper}>
                <Link to={p_.link.to} className={`${grid.w100} ${item.none} ${item.block_mob}`}>
                    <Rectangle width="3" height="2">
                        <TileContent
                            src={p_.src}
                            text={p_.text}
                        />
                    </Rectangle>
                </Link>
                <Link to={p_.link.to} className={tileLine.imgWrapper}>
                    <div className={tileLine.img}>
                        <TileContent
                            src={p_.src}
                            text={p_.text}
                        />
                    </div>
                </Link>
                <div className={grid.space}>
                    <div className={tileLine.content}>
                        <div>
                            {p_.children}
                        </div>
                        <div className={`${grid.mbMini} ${text.preWrap}`}>
                            {p_.description}
                        </div>
                        <Toolbar
                            small={true}
                            to={p_.link.to}
                            url={`http://${config.host}${p_.link.to}`}
                            title={p_.text}
                            media={p_.src}
                            description={p_.description}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
TileLine.defaultProps = {
    link: {}
};

export default TileLine;