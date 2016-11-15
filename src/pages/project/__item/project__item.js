import React from 'react';
import Rectangle from 'blocks/rectangle/rectangle';

import projectItem from './project__item.css';
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
            <div className={projectItem.wrapper}>
                <div className={`${grid.w100} ${item.none} ${item.block_mob}`}>
                    <Rectangle
                        width="3"
                        height="2"
                        src={p_.src}
                    />
                </div>
                <div className={projectItem.imgWrapper}>
                    <div 
                        className={projectItem.img}
                        style={{backgroundImage: `url(${p_.src})`}}
                    >
                    </div>
                </div>
                <div className={`${grid.space} ${grid.pMini}`}>
                    <div className={projectItem.text}>{p_.text}</div>
                    <div className={projectItem.content}>
                        {p_.children}
                    </div>
                    {p_.buttons}
                </div>
            </div>
        );
    }
}
TileLine.defaultProps = {};

export default TileLine;