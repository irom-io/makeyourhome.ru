import React from 'react';
import Done from 'react-icons/lib/md/done';
import Edit from 'react-icons/lib/md/edit';
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
                    <div className={projectItem.iconWrapper}>
                        <div
                            title="Изменить проект"
                            className={projectItem.icon}
                        >
                            <div className={`${grid.mrMini} ${grid.mrMicro_mob}`}>
                                Изменить проект
                            </div>
                            <Edit size={20} />
                        </div>
                        <div
                            title="Заказать"
                            className={projectItem.icon}
                        >
                            <div className={`${grid.mrMini} ${grid.mrMicro_mob}`}>
                                Заказать
                            </div>
                            <Done size={20} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
TileLine.defaultProps = {};

export default TileLine;