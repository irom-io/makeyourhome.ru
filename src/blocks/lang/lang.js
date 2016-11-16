import React from 'react';
import lang from './lang.css';
import grid from 'blocks/grid/grid.css';
import Link from 'blocks/link/link';
import queryString from 'query-string';

export const createHref = (newQuery, location) => {
    const query = location.query;
    let current = '';
    let key;
    let index = 0;

    if (location.pathname[0] !== '/') {
        current = `/${location.pathname}`;
    } else {
        current = `${location.pathname}`;
    }

    for (key in query) {
        if (query.hasOwnProperty(key)) {
            if (typeof newQuery[key] === 'undefined') {
                newQuery[key] = query[key];
            }
            
            if (!newQuery[key] && typeof newQuery[key] !== 'undefined') {
                newQuery[key] = undefined;
            }
        }
    }
    for (key in newQuery) {
        if (newQuery.hasOwnProperty(key) && newQuery[key]) {
            index++;
        }
    }

    if (index > 0) {
        current = `${current}?${queryString.stringify(newQuery)}`;
    }

    return current;
};

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
        const p_ = this.props;
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
                                    to={createHref({lang: item.key}, p_.location)}
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