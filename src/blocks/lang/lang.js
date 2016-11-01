import React from 'react';
import lang from './lang.css';
import grid from 'blocks/grid/grid.css';
import Link from 'blocks/link/link';
import cn from 'classnames';

class Lang extends React.Component {
    constructor(p_) {
        super(p_);

        this.state = {
            items: [
                {name: 'Ru', active: true},
                {name: 'Eng'},
                {name: 'Es'}
            ]
        };
    }
    render() {
        const s_ = this.state;

        return (
            <div className={lang.wrapper}>
                <div className={grid.row}>
                    {s_.items.map((item, index) => {
                        return (
                            <div
                                key={`lang__item_${index}`}
                                className={cn({[lang.item]: !item.active, [lang.active]: item.active})}
                            >
                                <Link>{item.name}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Lang;