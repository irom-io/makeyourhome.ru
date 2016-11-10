import React from 'react';
import {TileContent} from 'blocks/tile/tile';
import Link from 'blocks/link/link';
import Rectangle from 'blocks/rectangle/rectangle';
import Toolbar from 'blocks/toolbar/toolbar';

import tileLine from './tile_line.css';
import grid from 'blocks/grid/grid.css';
import item from 'blocks/item/item.css';

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
                        <div className={grid.mbMini}>
                            {p_.children}
                        </div>
                        <Toolbar
                            small={true}
                            to={p_.link.to}
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