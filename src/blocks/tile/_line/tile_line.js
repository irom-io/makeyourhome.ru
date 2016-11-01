import React from 'react';
import {TileContent} from 'blocks/tile/tile';
import Link from 'blocks/link/link';
import Rectangle from 'blocks/rectangle/rectangle';
import Button from 'blocks/button/button';
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
                        {p_.children}
                        {!p_.toolbar &&
                        <div className={`${text.right} ${grid.mtMini}`}>
                            <Link to={p_.link.to}>
                                <Button isText={true}>{p_.link.text}</Button>
                            </Link>
                        </div>
                        }
                        {p_.toolbar}
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