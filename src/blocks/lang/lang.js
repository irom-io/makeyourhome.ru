import React from 'react';
import lang from './lang.css';
import grid from 'blocks/grid/grid.css';
import Link from 'blocks/link/link';

class Lang extends React.Component {
    constructor(p_, context) {
        super(p_, context);

        this.state = {
            items: [
                {name: 'Ru', key: 'ru'},
                {name: 'Esp', key: 'esp'},
                {name: 'En', key: 'en'}
            ]
        };
    }
    render() {
        const active = this.props.location.query.lang || 'ru';
        const s_ = this.state;

        return (
            <div className={lang.wrapper}>
                <div className={grid.row}>
                    {s_.items.map((item, index) => {
                        return (
                            <div
                                key={`lang__item_${index}`}
                                className={(active === item.key)? lang.active : lang.item}
                            >
                                <Link
                                    to={`/?lang=${item.key}`}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
Lang.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Lang;